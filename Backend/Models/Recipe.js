const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    
  title: String,
  ingredients: [String],
  instructions: String,
  cookingTime: Number,
  image: { type: String },
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
