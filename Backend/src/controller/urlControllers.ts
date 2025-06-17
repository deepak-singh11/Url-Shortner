import { urlModel } from '../model/urlModel.js'
import { urlStatsModel } from '../model/urlStats.js';
import { Response, Request } from "express";
import { UAParser } from "ua-parser-js";
import * as cheerio from 'cheerio';
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import axios from 'axios';

import "dotenv/config";

interface DataType {
    originalUrl: string;
    slug: string;
    expiresAt?: Date;
    clickLimit?: number;
    owner: mongoose.Types.ObjectId;
    title?: string | null;
}

async function fetchTitleFromUrl(url: string): Promise<string | null> {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const title = $('title').text().trim();
        return title || null;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching title:", error.message);
        } else {
            console.error("Unknown error fetching title:", error);
        }
    }
    return null;
}


const createShortUrl = async (req: Request, res: Response) => {
    try {
        const userId = req.user;
        if (!userId)
            return res.status(403).json({ message: "Unauthorized access. UserId not provided" });


        const { originalUrl, customSlug, expiresIn, clickLimit } = req.body;
        // Original Url Present?
        if (!originalUrl) {
            return res.status(403).json({ message: "Original Link is required " });
        };

        // Slug Selection
        const slug = customSlug ? customSlug : nanoid(6);

        const isSlugPresent = await urlModel.findOne({ slug });
        if (isSlugPresent)
            return res.json({ message: "slug is attached to an url. Try different slug" });

        // Data Object
        const urlData: DataType = {
            originalUrl,
            slug,
            owner: userId,
        }

        const title = await fetchTitleFromUrl(originalUrl);
        if (title) {
            urlData.title = title
        }
        // ExpiresIn provided??
        if (expiresIn) {
            console.log("expiresIn from frontend:", expiresIn); // Should be a date string
            const expiryDate = new Date(expiresIn);

            if (isNaN(expiryDate.getTime())) {
                return res.status(400).json({ message: "Invalid date format" });
            }

            if (expiryDate <= new Date()) {
                return res.status(400).json({ message: "Expiry date must be in the future" });
            }

            // Adding expiresAt in urlData
            urlData.expiresAt = expiryDate;
        }
        if (clickLimit) {
            urlData.clickLimit = clickLimit;
        }
        // New Slug Creation
        const newShortUrl = await urlModel.create(urlData);

        return res.json({
            shortUrl: process.env.BASE_URL + slug,
            message: "slug created successfully",
            newShortUrl,
            
        });

    } catch (error) {
        console.log("error occur in createShortUrl", error);
        return res.status(500).json({ message: "Error occur in signin route" });
    }

};

const redirectFullUrl = async (req: Request, res: Response) => {
    console.log("redirect");
    try {
        const { slug } = req.params;
        const slugDoc = req.slugDoc;

        // Incrementing slug click count
        slugDoc.clickCount += 1;
        await slugDoc.save();

        // Device type
        const parser = new UAParser(req.get('User-Agent') || '');
        const deviceType = parser.getDevice().type || 'desktop';

        // IP
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        
        // Fake Referrers, Countries and Cities
        const possibleReferrers = ['Google', 'Yahoo', 'LinkedIn', 'Facebook', 'Instagram', 'X'];
        const randomCountries = ['India', 'USA', 'Germany', 'Japan', 'Australia'];
        const randomCities = ['Delhi', 'New York', 'Berlin', 'Tokyo', 'Sydney'];
        const possibleDevices = ['mobile','desktop','tablet','unknown'];
        // Location:
        let location = {};
        try {
            const geoRes = await axios.get(`http://ip-api.com/json/${ip}`);
            const { country, city, regionName, timezone } = geoRes.data;
            location = {
                country:country||randomCountries[Math.floor(Math.random() * randomCountries.length)],
                city: city || randomCities[Math.floor(Math.random() * randomCities.length)],
                region: regionName,
                timezone
            };
            console.log("location of the user is: ",location);
        } catch (err) {
            if(err instanceof(Error))
            console.error("Geo lookup failed", err.message);
        }
        

        // Updating slug stats
        const newUrlStats = await urlStatsModel.create({
            slug,
            clickedAt: Date.now(),
            referrer: req.get('Referrer') || possibleReferrers[Math.floor(Math.random() * possibleReferrers.length)],
            device:  possibleDevices[Math.floor(Math.random() * possibleDevices.length)],
            location,
            browser: req.get('User-Agent') || '',
        })
        // Redirect to Original Url
        return res.redirect(slugDoc.originalUrl);

    } catch (error) {
        console.log("error occur in redirect route", error);
        return res.status(500).json({ message: "Error occur in redirect route" });
    }
};

const getAllSlugs = async (req: Request, res: Response) => {
    try {
        console.log("user reached");
        const id = req.user;
        console.log("id is: ", id);
        // Fetching all Slugs
        const allSlug = await urlModel.find({ owner: id }).sort({ createdAt: -1 });

        if (!allSlug)
            return res.json({ message: "No slug available" });

        // Sendin Slugs
        return res.json(allSlug);
    } catch (error) {
        console.log("error occur in getAllSlugs", error);
        return res.status(500).json({ message: "Error occur in getAllSlugs route" });
    }


}

const slugInfo = async (req: Request, res: Response) => {
    try {
        const slugDocument = req.slugDoc;
        console.log(slugDocument);
        res.status(200).json({ message: "slug info fetched successfully", slugDocument });
        

    } catch (error) {
        console.log("error occured in slugInfo route");
        res.status(403).json({ message: "Error occured in Sluginfo route " });
    }
}

const slugStats = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        console.log("slug recieved: ", slug);
        // Slug Provided?
        if (!slug)
            return res.json({ message: "No slug available in params" });

        // Slug Info Feteching
        const slugInfo = await urlStatsModel.find({ slug });
        if (!slugInfo)
            return res.json({ message: "No slug available in Database" });

        return res.status(200).json({ message: "Slug Stats fetched successfully", slugInfo });
    } catch (error) {
        console.log("error occur in slugInfo", error);
        return res.status(500).json({ message: "Error occur in slugInfo route" });
    }


}

const redirectUpdate = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const { id } = req.user;
        const body = req.body;
        const isSlugExist = req.slugDoc;

        const filter = {
            owner: id,
            slug,
        }
        // Updating Slug Model
        const updateData = Object.assign(isSlugExist, body);
        await isSlugExist.save();
        console.log(updateData);

        if (body.originalUrl) {
            // Updating slug Stats
            const newUrlStats = await urlStatsModel.updateMany(
                {
                    slug
                },
                {
                    originalUrl: body.originalUrl

                }

            )

        };


        // Redirect to Original Url
        return res.status(200).json({ message: "Slug updated successfully" });

    } catch (error) {
        console.log("error occur in redirectUpdate route", error);
        return res.status(500).json({ message: "Error occur in redirectUpdate route" });
    }
}
export { createShortUrl, redirectFullUrl, getAllSlugs, slugStats, redirectUpdate, slugInfo };

