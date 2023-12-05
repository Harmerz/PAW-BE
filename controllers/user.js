const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.')
}

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.')
}

exports.userData = async (req, res) => {
  const token = req?.headers?.['authorization']?.split(' ')?.[1]
  let data
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    data = decoded
    if (err) {
      console.log(err)
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }
  })
  console.log(data)
  const user = await User.findOne({
    _id: data.id,
  })
  console.log(user)
  res.status(200).send({
    name: user?.name,
    id: data?.id,
    email: user?.email,
    roles: user?.roles,
  })
}

exports.userInput = async (req, res) => {
  const token = req?.headers?.['authorization']?.split(' ')?.[1]
  let data
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    data = decoded
    if (err) {
      console.log(err)
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }
  })
  const dataUser = req.body
  await User.updateOne(
    {
      _id: data.sub,
    },
    dataUser
  )

  res.status(200).send('Success')
}
