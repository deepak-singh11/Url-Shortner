import { Request,Response,NextFunction } from "express";
import { urlModel } from '../model/urlModel.js';

export const validateShortUrl=async(req:Request,res:Response,next:NextFunction)=>{
    const {slug}=req.params;
    // slug provided?
    if(!slug)
        return res.status(403).json({message:"Slug not provided"});
    
    // slug Exist?
    const isSlugExist= await urlModel.findOne({slug});
    if(!isSlugExist)
        return res.status(403).json({message:"Slug Expired or not present in DB"});
    
    // ClickLimit?
    const clickLimit= isSlugExist.clickLimit;    
    console.log(clickLimit,isSlugExist.clickCount)
    if(isSlugExist.clickCount>clickLimit)
        return res.status(403).json({message:"Slug clicked limit reached"});

    
    req.slugDoc = isSlugExist;
    next();         

}

