const User = require('../models/user')
const Role = require('../models/role')
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
  User.findOne(Finder)
    .populate('roles', '-__v')
    .exec((err, user) => {
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
      const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 1800,
      })

      // Generate refresh token
      const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 2592000, // 30 days
      })

      res.status(200).send({
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    })
}
