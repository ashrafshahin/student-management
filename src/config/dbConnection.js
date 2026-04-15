const mongoose = require('mongoose')


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Student Management Database Connected...");
        
    } catch (error) {
        console.log("Database Error");
        
    }
}

module.exports = dbConnection