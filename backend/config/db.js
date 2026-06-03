const mongoose = require('mongoose');

const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("Database is connected succesfully")

    }
    catch(err){
        console.error('Database connection failed:', err.message);
        process.exit(1)
    }
}

module.exports = connectDB;
