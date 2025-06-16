import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = async()=>{
    try {
        const mongoDbUrl=process.env.MONGODB_URL;
        if(!mongoDbUrl){
            throw new Error("MONGODB_URL environment variable is not defined.");
        }

        await mongoose.connect(mongoDbUrl);
        console.log("database connected");
          
        
    } catch (error) {
        console.log("database not connected");
    }
};