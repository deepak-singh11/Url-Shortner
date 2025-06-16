// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import passport from 'passport';

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID!,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   callbackURL: "/auth/google/callback"
// }, (accessToken, refreshToken, profile, done) => {
//   // You can save the user to DB here if needed.
//   // For now, we directly return the profile
//   return done(null, profile);
// }));

// passport.serializeUser((user, done) => {
//   done(null, user); // Save whole profile in session (simple version)
// });

// passport.deserializeUser((user: any, done) => {
//   done(null, user);
// });
