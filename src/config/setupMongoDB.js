import mongoose from "mongoose";

const setupMongoDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connected to MongoDB");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    
    }

}

export default setupMongoDB;