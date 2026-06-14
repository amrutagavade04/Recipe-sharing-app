// Controllers/CommentController.js
const Comment = require("../Models/Comment");

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const recipeId = req.params.recipeId;

    const comment = new Comment({ text, user: req.user.id, recipe: recipeId });
    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCommentsForRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const comments = await Comment.find({ recipe: recipeId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
