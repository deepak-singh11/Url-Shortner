import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {userModel} from '../model/userModel.js';
import passport from 'passport';
import 'dotenv/config';

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    callbackURL: "http://localhost:3000/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0].value;
        const isUserExist = await userModel.findOne({ email });

        const payload = {
            email,
            username:profile.displayName,
            profileImage: profile.photos?.[0]?.value,
            isExistingUser:isUserExist,
        }
        console.log("sending payload",payload);
        return done(null, payload);

    } catch (error) {
        return done(error, false);
    }
}));

// Called when user logs in.Stores the user data in the session.Here you're just storing the whole user object.
passport.serializeUser((user, done) => {
    done(null, user); // Save whole profile in session (simple version)
});


// Called on every request after login. Retrieves user data from session and attaches it to req.user.
passport.deserializeUser((user: any, done) => {
    done(null, user);
});
