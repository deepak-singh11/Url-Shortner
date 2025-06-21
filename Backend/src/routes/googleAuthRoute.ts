// import express from 'express';
// import passport from 'passport';
// import jwt from 'jsonwebtoken';
// import { Request,Response } from 'express';
// import 'dotenv/config'


// interface UserDataType {
//   email: string;
//   id: string;
// }
// const router = express.Router();

// // Step 1: Start Google login process
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Step 2: Callback after login-->	Receives the response from Google and redirects to frontend(if successed).
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), (req: Request, res:Response) => {

//   // After successful login, 
//   try {
//     const googleUserData = req.user as Express.Request['googleUser'];
//     if (!googleUserData)
//       return res.status(403).json({ message: "user is not registered" });

//     const secret = process.env.JWT_SECRET!;
//     const token = jwt.sign({ id: googleUserData.id }, secret);

//     const expiresAt = 3600000;
//     res.cookie('token', token, {
//       httpOnly: true,        // Can't be accessed by JavaScript
//       secure: false,          // Only sent over HTTPS
//       sameSite: 'none',      // Prevents CSRF
//       maxAge: expiresAt      // 1 hour
//     })

//     return res.status(200).json({
//       message: "LoggedIn Succesfully",
//       userData: {
//         username: googleUserData.username,
//         email: googleUserData.email,
//         profileImage: googleUserData.profileImage,
//         joinedAt: googleUserData.joinedAt,
//       },
//       tokenExpiry: { expiresAt: Date.now() + expiresAt}
//     });






//   } catch (error) {

//   }


//   res.redirect('http://localhost:5173/home');
// }
// );

// export default router;
