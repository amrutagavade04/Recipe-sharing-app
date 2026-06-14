const express = require("express");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  deleteRecipe,
  likeRecipe,
  updateRecipe,
} = require("../Controllers/RecipeController");
const auth = require("../Middleware/auth");

const router = express.Router();

// CREATE recipe


const upload = require("../Middleware/upload");

router.post(
  "/",
  auth,
  upload.single("image"),
  createRecipe
);


// GET all recipes
router.get("/", getRecipes);

// GET single recipe
router.get("/:id", getRecipeById);

// UPDATE recipe
router.put(
  "/:id",
  auth,
  upload.single("image"),
  updateRecipe
);

// DELETE recipe
router.delete("/:id", auth, deleteRecipe);

// LIKE recipe
router.post("/:id/like", auth, likeRecipe);

module.exports = router;
