const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bahan Masak',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Recipe', recipeSchema)
