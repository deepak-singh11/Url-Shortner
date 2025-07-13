import express from 'express';
import passport from 'passport';
import { userModel } from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import 'dotenv/config'
import { Types } from 'mongoose';


interface UserDataType {
  email: string;
  id: string;
}
const router = express.Router();

// Step 1: Start Google login process
// @ts-ignore
router.get('/google', (req,res,next)=>{
  const mode=req.query.mode;
  res.cookie('oauthMode',mode);
  next();
}, passport.authenticate('google' , { scope: ['profile', 'email'] }));

// Step 2: Callback after login-->	Receives the response from Google and redirects to frontend(if successed).
// @ts-ignore
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), async(req, res) => {

  const mode=req.cookies.oauthMode;
  res.clearCookie('oauthMode');

  // After successful login, 
  try {
    const userData = req.user as {
      email: string;
      username: string;
      profileImage: string;
      isExistingUser: {
        _id:Types.ObjectId,
        username:string;
        email:string;
        password:string;
        profileImage:string;
        joinedAt:string;
      } | false;
    };

    console.log("value of mode in google auth is : ", mode);
    console.log("userData id is: ",userData);
    
    
    if (!userData.isExistingUser && mode=="login")
       return res.redirect("http://localhost:5173?error=not_registered");

    if(userData.isExistingUser && mode=="signup" )
      return res.redirect("http://localhost:5173/signup?error=already_registered");

    let newUser;
    if(mode=="signup"){
       newUser=await userModel.create({
        email:userData.email,
        username:userData.username,
        profileImage:userData.profileImage,
        authProvider:"google",
      });
    }
    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign({ id: userData.isExistingUser? userData.isExistingUser._id : newUser!._id }, secret, { expiresIn: '1h' });
    

    // Send token + user info to frontend via URL
    const redirectUrl = new URL('http://localhost:5173/');
    redirectUrl.searchParams.set('token', token);
    redirectUrl.searchParams.set('username', userData.isExistingUser? userData.isExistingUser.username: newUser!.username);
    redirectUrl.searchParams.set('email',userData.isExistingUser? userData.isExistingUser.email: newUser!.email);
    redirectUrl.searchParams.set('joinedAt',userData.isExistingUser? userData.isExistingUser.joinedAt : newUser!.joinedAt.toISOString());
    redirectUrl.searchParams.set('profileImage', (userData.isExistingUser ? userData.isExistingUser.profileImage : newUser!.profileImage) ?? "");
    

    const expiresAt = 3600000;
    res.cookie('token', token, {
      httpOnly: true,          // Can't be accessed by JavaScript
      secure: true,            // Only sent over HTTPS
      sameSite: 'none',        // Prevents CSRF
      maxAge: expiresAt        // 1 hour
    })

    res.redirect(redirectUrl.toString());

  } catch (error) {
    console.log("error occur in google Auth Route",error);
  }
}
);

export default router;
