import { userModel } from '../model/userModel.js'
import cloudinary from '../utils/cloudinary.js';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config'


// Signup Route 
const signupRoute = async (req: Request, res: Response) => {
    try {
        // All fields
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            return res.status(403).json({ message: "All Fields are required" });

        // Unique Mail Id
        const userExist = await userModel.findOne({ email });
        if (userExist)
            return res.status(403).json({ message: "User Already Exist. Try different email" });

        // New User Creation
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        // Token Creation
        const secret = process.env.JWT_SECRET;
        let token;
        if (secret) {
            token = jwt.sign({ id: newUser._id }, secret)
        }

        const expiresAt = 3600000;
        res.cookie('token', token, {
            httpOnly: true,      // Can't be accessed by JavaScript
            secure: true,        // Only sent over HTTPS
            sameSite: 'strict',  // Prevents CSRF
            maxAge: expiresAt      // 1 hour
        })
        return res.status(200).json({
            message: "Signup Succesfully",
            userData: {
                username,
                email,
                profileImage: newUser.profileImage,
                joinedAt: newUser.joinedAt,
            },
            tokenExpiry: {
                expiresAt: Date.now() + expiresAt,
            }
        });

    } catch (error) {
        console.log("error occur in signup route", error);
        return res.status(500).json({ message: "Error occur in signup route" });
    }

}

// Signin Route
const signinRoute = async (req: Request, res: Response) => {
    try {
        // All Fields
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password)
            return res.status(403).json({ message: "All fields are required" });

        // User Exist?
        const userExist = await userModel.findOne({ email });
        if (!userExist)
            return res.status(403).json({ message: "User didn't exist. Try different email" });

        // Password Matched?
        const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
        console.log(isPasswordCorrect);
        if (!isPasswordCorrect)
            return res.status(403).json({ message: "Password is incorrect" });

        // Token Creation
        const secret = process.env.JWT_SECRET;
        let token;
        if (secret) {
            token = jwt.sign({ id: userExist._id }, secret)
        }
        const expiresAt = 3600000;
        res.cookie('token', token, {
            httpOnly: true,      // Can't be accessed by JavaScript
            secure: true,        // Only sent over HTTPS
            sameSite: 'strict',  // Prevents CSRF
            maxAge: expiresAt      // 1 hour
        })

        return res.status(200).json({
            message: "LoggedIn Succesfully",
            userData: {
                username: userExist.username,
                email,
                profileImage: userExist.profileImage,
                joinedAt: userExist.joinedAt,
            },
            tokenExpiry: { expiresAt: Date.now() + expiresAt, }
        });

    } catch (error) {
        console.log("error occur in signup route", error);
        return res.status(500).json({ message: "Error occur in signin route" });
    }

}

const profileUpdateRoute = async (req: Request, res: Response) => {
    try {
        console.log("profile hit");
        const userDoc = req.userDoc;
        // Extracting 
        const currentPassword = req.body.currentPassword;
        const newUsername = req.body.displayName
        const newPassword = req.body.newPassword

        if (newUsername)
            userDoc.username = newUsername;

        if (newPassword && currentPassword) {
            const isPasswordCorrect = await bcrypt.compare(currentPassword, userDoc.password,);
            // Current Password Wrong?
            if (!isPasswordCorrect)
                return res.status(403).json({ message: "Current password is wrong" });

            // Updating new Password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            userDoc.password = hashedPassword;
            console.log("userDoc value is: ", userDoc);
        }
        userDoc.save();
        return res.status(200).json({
            message: "Profile updated Successfully",
            userData: {
                username: userDoc.username,
                email: userDoc.email,
                profileImage: userDoc.profileImage,
                joinedAt: userDoc.joinedAt,
            }
        });


    } catch (error) {
        console.log("Error occur in profileUpdateRoute", error);
    }
}

const profileImageUploadRoute = async (req: Request, res: Response) => {
    try {
        const user = req.userDoc;

        const file = req.body.image;
        if (!file) return res.status(400).json({ message: "Image is required" });

        // Upload base64 or file URL
        const result = await cloudinary.uploader.upload(file, {
            folder: 'profile_pictures'
        });

        // Save URL in Db
        user.profileImage = result.secure_url;
        await user.save();

        res.status(200).json({message:"Profile image updated successfully",
                              userData:{
                                username:user.username,
                                email:user.email,
                                profileImage:user.profileImage,
                                joinedAt: user.joinedAt,
                              }
                            });

    } catch (error) {
        console.log("error occur in profile Image Upload Route", error);
        res.status(500).json({ message: 'Cloudinary upload failed' });
    }
}

const deleteAccount = async (req: Request, res: Response) => {
    try {
        const userDoc = req.userDoc;

        await userDoc.deleteOne();

        res.status(200).json({ message: "Account deleted successfully" });

    } catch (error) {
        console.log("Error deleting the account", error);
        res.status(500).json({ message: "Server error while deleting account" });
    }
}

export { signupRoute, signinRoute, profileUpdateRoute, deleteAccount, profileImageUploadRoute }