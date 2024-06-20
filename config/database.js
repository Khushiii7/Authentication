import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
    console.log("MongoDB Connected...");
}).catch((err) =>{
    console.log("Error while creating MongoDB connection!", err);
})

export default mongoose;
