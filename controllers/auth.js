const User = require('../models/user')
const Role = require('../models/role')
const Refresh = require('../models/resfresh')
require('dotenv').config()

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')

  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          user.roles = roles.map((role) => role._id)
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err })
              return
            }

            res.send({ message: 'User was registered successfully!' })
          })
        }
      )
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        user.roles = [role._id]
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          res.send({ message: 'User was registered successfully!' })
        })
      })
    }
  })
}

exports.signin = (req, res) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  const Finder = req?.body?.username
    ? {
        username: req.body.username,
      }
    : {
        email: req.body.email,
      }
  console.log(Finder)
  User.findOne(Finder)
    .populate('roles', '-__v')
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          refreshToken: null, // Include refresh token field
          message: 'Invalid Password!',
        })
      }

      // Generate access token
      const accessToken = jwt.sign(
        { id: user.id, type: 'access' },
        process.env.ACCESS_TOKEN_SECRET,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 1800,
        }
      )

      // Generate refresh token
      const refreshToken = jwt.sign(
        { id: user.id, type: 'refresh' },
        process.env.REFRESH_TOKEN_SECRET,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 2592000, // 30 days
        }
      )
      const refresh = new Refresh({
        token: refreshToken,
      })
      await refresh.save()

      res.status(200).send({
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    })
}

exports.refreshAccessToken = async (req, res) => {
  const token = req?.headers?.['authorization']?.split(' ')?.[1]
  const refresh = await Refresh.findOne({
    token: token,
  })
  if (!refresh) return res.sendStatus(403)
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }

    const accessToken = jwt.sign(
      {
        type: 'access',
        id: decoded.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 1800,
      }
    )

    res.json({ accessToken: accessToken })
  })
}

exports.logout = async (req, res) => {
  const refresh = req?.headers?.['authorization']?.split(' ')?.[1]

  await Refresh.findOneAndDelete({
    token: refresh,
  })

  res.sendStatus(204)
}
