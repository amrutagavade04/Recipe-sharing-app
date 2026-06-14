const Recipe = require("../Models/Recipe");

// Add a new recipe
exports.createRecipe = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const recipe = new Recipe({
      title: req.body.title,
      ingredients: JSON.parse(req.body.ingredients), // 👈 VERY IMPORTANT
      instructions: req.body.instructions,
      cookingTime: Number(req.body.cookingTime),
      image: req.file ? `/uploads/${req.file.filename}` : "",
      user: req.user.id,
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error("CREATE RECIPE ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "name");
    res.status(200).json(recipes); // 👈 ARRAY return
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single recipe
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("user", "name email");

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe)
      return res.status(404).json({ message: "Recipe not found" });

    // Only owner can edit
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    recipe.title = req.body.title || recipe.title;
    recipe.instructions =
      req.body.instructions || recipe.instructions;
    recipe.cookingTime =
      Number(req.body.cookingTime) || recipe.cookingTime;

    if (req.body.ingredients) {
      recipe.ingredients = JSON.parse(req.body.ingredients);
    }

    if (req.file) {
      recipe.image = `/uploads/${req.file.filename}`;
    }

    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete a recipe
// DELETE recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // ✅ Only owner can delete
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await recipe.deleteOne();

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Like a recipe
exports.likeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
   

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    recipe.likes += 1;
    await recipe.save();

    res.json({ likes: recipe.likes });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
