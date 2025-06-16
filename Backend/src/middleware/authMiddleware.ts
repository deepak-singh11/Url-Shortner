import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userModel } from '../model/userModel.js';
import "dotenv/config";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        // Token Present?
        if (!token) {
            console.error("token is not present or invalid");
            return res.status(500).json({ message: 'Server configuration error' });
        }
        // secret fetch 
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET environment variable is not defined.");
            return res.status(500).json({ message: 'Server configuration error' });
        }
        // Decode Token
        let decoded: string | JwtPayload;
        decoded = jwt.verify(token, secret);

        // If payload not present
        if (typeof (decoded) === 'string' || !('id' in decoded)) {
            return res.status(403).json({ message: "Invalid token payload structure" });
        }

        // User exist with Id?
        const userExist = await userModel.findOne({ _id: decoded.id });
        if (!userExist)
            return res.status(404).json({ message: "User not found for this token" }); // User associated with token not found

        // Putting id into req.user
        req.user = decoded.id;
        req.userDoc=userExist;

        
        next();
    } catch (error) {
        console.log("error occur in authMiddleware",error);
        return res.status(500).json({message:"Error occur in Server"});
    }


}