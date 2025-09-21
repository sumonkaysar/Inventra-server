import { model, Schema } from "mongoose";
import { IUser, Role } from "./user.interface";



const userSchema = new Schema<IUser>({
    fullName: {type: String, required:true},
    email: {type: String, required: true},
    phoneNumber: {type: String},
    password: {type: String, required: true},
    role: {type: String, enum: Object.values(Role), default: Role.USER},
    profileImage: {type: String},
    isTwoFactorEnabled: {type: Boolean},
},
{
    timestamps: true,
    versionKey: false
})

export const User = model<IUser>("User",userSchema)