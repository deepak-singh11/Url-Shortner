// import express from 'express';
// import passport from 'passport';

// const router = express.Router();

// // Step 1: Start Google login
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Step 2: Callback after login
// router.get('/google/callback',passport.authenticate('google', {failureRedirect: '/login',session: true}),(req, res) => {
//     // After successful login, redirect to frontend
//     res.redirect('http://localhost:5173/home');
//   }
// );

// export default router;
