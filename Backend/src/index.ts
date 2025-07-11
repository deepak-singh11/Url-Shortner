import { validateShortUrl } from './middleware/validateSlugMiddleware.js';
import { redirectFullUrl } from './controller/urlControllers.js';
import { connectDB } from './database/connect.js';
import userRoutes from './routes/userRoute.js';
import urlRoutes from './routes/urlRoute.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import "dotenv/config";
import qrRoutes from './routes/qrRoutes.js';

// Google imports
import googleAuthRoute from './routes/googleAuthRoute.js'
import './auth/google.js';

const app=express();
const PORT=process.env.PORT|| 3000;

app.use(express.json({limit:'5mb'}));
app.use(cookieParser());
app.use(cors({ 
    origin:["http://localhost:4173",
            "http://localhost:5173",
            "http://frontend-container:4173",
            "http://url-shortener.deepak-projects.xyz",
            "https://url-shortener.deepak-projects.xyz"],
        
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,

}))

// @ts-ignore
app.get("/:slug",validateShortUrl,redirectFullUrl)
app.use("/api/v1/url",urlRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/qr/",qrRoutes);
app.use("/auth",googleAuthRoute);

app.listen(3000, ()=>{
    connectDB();
    console.log(`Server is running on PORT ${PORT}`);
})