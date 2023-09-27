const Recipe = require('../models/recipe')

exports.getRecipe = (req, res) => {
  Recipe.find()
    .then((recipe) => {
      if (!recipe) return res.status(404).json({ message: 'Recipe tidak ditemukan' })
      return res.json(recipe)
    })
    .catch((err) => console.log(err))
}

exports.getOneRecipe = (req, res) => {
  const recipeId = req.params._id; // Assuming the ID is passed in the request parameters

    Recipe.findById(recipeId)
      .then((recipe) => {
        if (!recipe) return res.status(404).json({ message: 'Recipe tidak ditemukan' });
        return res.json(recipe);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      });
}

exports.addRecipe = (req, res) => {
  const recipe = new Recipe({
    Id: req.body._id,
    name: req.body.name,
    ingredient: req.body.ingredient,
    description: req.body.description,
  })
  recipe.save((err, recipe) => {
    if (err) return res.status(500).json({ error: err })
    return res.json(recipe)
  })
}

exports.deleteRecipe = (req, res) => {
  Recipe.findByIdAndDelete(req.params._id, (err) => {
    if (err) return res.status(500).json({ error: err });
    return res.sendStatus(200);
  });
};

exports.updateRecipe = (req, res) => {
  const { name, ingredient, description } = req.body;

  Recipe.findByIdAndUpdate(
    req.params._id,
    { name, ingredient, description },
    { new: true },
    (err, recipe) => {
      if (err) return res.status(500).json({ error: err });
      return res.json(recipe);
    }
  );
};
