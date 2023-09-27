const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  qtype: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Bahan Masak', inventorySchema)
