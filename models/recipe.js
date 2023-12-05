const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredient: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instruction: {
    type: [String],
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Recipe', recipeSchema)
