import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../../../config/db";
import { Role } from "../../enums/enums";
import User from "../../../models/user.mode";

dotenv.config();

const superAdmin = {
    username: 'superadmin',
    email: 'superadmin@example.com',
    password: 'secret',
    role: Role.ADMIN,
};

export const  seedAdmin = async () => {
    try {

        // Check if the super admin already exists
        const existingAdmin = await User.findOne({ email: superAdmin.email });
        if (existingAdmin) {
            console.log('User Seeder executed successfully.');
            return;
        }

        // Create super admin
        const hashedPassword = await bcrypt.hash(superAdmin.password, 10);
        const newAdmin = new User({
            username: superAdmin.username,
            email: superAdmin.email,
            password: hashedPassword,
            role: superAdmin.role
        });

        await newAdmin.save();
        console.log('User Seeder executed successfully.');
    } catch (err) {
        console.error("User Seeder Error: ", err);
    } 
};
