/* eslint-disable no-unused-vars */

export enum Role {
    ADMIN = "ADMIN",
    STAFF = "STAFF",
    USER = "USER"
}

export interface IUser {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    password: string;
    role: Role;
    profileImage?:string;
    isTwoFactorEnabled?:boolean;
    createdAt: Date;
    updatedAt: Date
}