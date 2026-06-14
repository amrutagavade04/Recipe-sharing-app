const mongoose = require('mongoose')
require('dotenv').config()

const  connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("databse is connected successfully✅")
    } catch (error) {
        console.error('mongoose connected failed', error.message);
        process.exit(1)

    }
}
connectDB()