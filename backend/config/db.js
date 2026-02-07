import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dishans:123dishan123@cluster0.mkuoazv.mongodb.net/urbaneats-app').then(()=>console.log("DB Connected"));
}