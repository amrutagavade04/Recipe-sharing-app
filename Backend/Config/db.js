const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log("DB_URL:", process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully ✅");
  } catch (error) {
    console.error("Mongoose connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;