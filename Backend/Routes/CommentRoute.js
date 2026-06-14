const express = require("express");
const router = express.Router();

// Correct imports — match your file names!
const {
  addComment,
  getCommentsForRecipe,
} = require("../Controllers/CommentController");

// Auth middleware
const auth = require("../Middleware/auth");

router.post("/:recipeId", auth, addComment);
router.get("/:recipeId", getCommentsForRecipe);

module.exports = router;
