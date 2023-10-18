import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    userId: String
})

const userModel = mongoose.model('users', userSchema)

export default userModel