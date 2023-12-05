const { authJwt } = require('../middlewares')
const controller = require('../controllers/user')
const express = require('express')
const router = express.Router()

router.get('/user', [authJwt.verifyToken], controller.userData)
router.post('/user', [authJwt.verifyToken], controller.userInput)
module.exports = router
