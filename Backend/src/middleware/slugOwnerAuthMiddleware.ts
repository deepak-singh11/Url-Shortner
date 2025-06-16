import { Request, Response, NextFunction } from "express";
import { urlModel } from '../model/urlModel.js';

export const slugOwnerAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const id=req.user;

    // slug provided?
    if (!slug)
        return res.status(403).json({ message: "Slug not provided" });

    // Is user id of the Slug Owner ?
    const isSlugExist = await urlModel.findOne({owner:id,slug});
    console.log("isSlugExist:",isSlugExist);
    if (!isSlugExist)
        return res.status(404).json({ message: "Either slug not present in DB or you're not the owner" });
    
    // Is user 
    req.slugDoc=isSlugExist;
    next();

}
