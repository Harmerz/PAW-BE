const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  items: [
    {
      inventory: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Bahan Masak',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Order', orderSchema)