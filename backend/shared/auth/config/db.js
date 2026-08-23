const connectDB = async () => {
    try{
        await mongoose.connectDB(process.env.MONGODB_URI)
        console.log("MongoDB connected successfully");
    }catch(e){
        console.error("Error connecting to MongoDB:", e.message);
    }
}

export default connectDB;