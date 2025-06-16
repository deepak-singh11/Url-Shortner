import { validateShortUrl } from './middleware/validateSlugMiddleware.js';
import { redirectFullUrl } from './controller/urlControllers.js';
import { connectDB } from './database/connect.js';
import userRoutes from './routes/userRoute.js';
import urlRoutes from './routes/urlRoute.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import "dotenv/config";

// Google imports
// import googleAuthRoute from './routes/googleAuthRoute.ts.js'
// import session from 'express-session';
// import passport from 'passport';

const app=express();
const PORT=process.env.PORT|| 3000;

app.use(express.json({limit:'5mb'}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET,POST,PUT,DELETE,"],
    credentials:true,

}))

// Session setup (needed by passport)
// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true
// }));

// Initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

// @ts-ignore
app.get("/:slug",validateShortUrl,redirectFullUrl)
app.use("/api/v1/url",urlRoutes);
app.use("/api/v1/user",userRoutes)

app.listen(3000, ()=>{
    connectDB();
    console.log(`Server is running on PORT ${PORT}`);
})