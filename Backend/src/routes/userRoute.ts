import express from 'express';
import { signupRoute, signinRoute, profileUpdateRoute, deleteAccount,profileImageUploadRoute } from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const Router=express.Router();
// @ts-ignore
Router.post('/signup',signupRoute);
// @ts-ignore
Router.post('/signin',signinRoute);
// @ts-ignore
Router.put('/update-profile', authMiddleware ,profileUpdateRoute);
// @ts-ignore
Router.delete("/delete-profile", authMiddleware, deleteAccount);
// @ts-ignore
Router.post("/profileImage-uploader",authMiddleware, profileImageUploadRoute);

export default Router;