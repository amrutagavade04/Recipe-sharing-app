require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// Import routes
const authRoutes = require("./Routes/UserRoute");
const recipeRoutes = require("./Routes/RecipeRoute");
const commentRoutes = require("./Routes/CommentRoute");
const connectDB = require("./Config/db");
const app = express();


const port = process.env.PORT || 7005;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use("/uploads", express.static("uploads"));




app.use("/api/user", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/comments", commentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port, ${PORT}`);

  
});
