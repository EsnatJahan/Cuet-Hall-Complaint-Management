import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        // const conn = await mongoose.connect(
        //     'mongodb+srv://esnat:160201@cluster0.2pzar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
   
        // console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectToDatabase;