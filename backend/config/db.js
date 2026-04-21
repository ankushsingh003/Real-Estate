import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://rathorankushrana143_db_user:<db_password>@cluster0.c1rznob.mongodb.net/RealEstate")
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
        console.log(err)
    })
}