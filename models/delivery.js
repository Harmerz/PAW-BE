const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: true,
  },
  orderItems: {
    type: String,
    required: true,
  },
  courier: {
    type: String,
    required: true,
  },
  estimedTime: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('Delivery', deliverySchema)