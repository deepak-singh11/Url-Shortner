import express from 'express';
import "dotenv/config";
import  {createShortUrl,getAllSlugs,slugStats,slugInfo } from '../controller/urlControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { slugOwnerAuthMiddleware } from '../middleware/slugOwnerAuthMiddleware.js';

const Router = express.Router();

// @ts-ignore
Router.post('/create', authMiddleware ,createShortUrl);
// @ts-ignore
Router.get("/allSlugs",authMiddleware,getAllSlugs)
// @ts-ignore
Router.get("/slugStats/:slug",authMiddleware,slugOwnerAuthMiddleware,slugStats)
// @ts-ignore
Router.get("/slugInfo/:slug",authMiddleware,slugOwnerAuthMiddleware,slugInfo)


export default Router;
