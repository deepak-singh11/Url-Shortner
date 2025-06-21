// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { userModel } from '../model/userModel';
// import passport from 'passport';

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     callbackURL: "/auth/google/callback"
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         const email = profile.emails?.[0].value;
//         const isUserExist = await userModel.findOne({ email });
//         if (!isUserExist)
//             return done(null, false, { message: "User not registered" });

//         const payload = {
//             id: isUserExist._id,
//             username:isUserExist.username,
//             email: isUserExist.email,
//             profileImage: isUserExist.profileImage,
//             joinedAt: isUserExist.joinedAt,
//         }
//         return done(null, payload);

//     } catch (error) {
//         return done(error, false);
//     }
// }));

// Called when user logs in.Stores the user data in the session.Here you're just storing the whole user object.
// passport.serializeUser((user, done) => {
    // done(null, user); // Save whole profile in session (simple version)
// });


// Called on every request after login. Retrieves user data from session and attaches it to req.user.
// passport.deserializeUser((user: any, done) => {
    // done(null, user);
// });
