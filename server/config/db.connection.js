import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async () => {
    mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("Database connected");
    })
    .catch(err => {
        console.log("Failed to connect to database");
        console.error(err);
    })
}

export default dbConnection;