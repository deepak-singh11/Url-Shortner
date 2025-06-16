import mongoose, { InferSchemaType, HydratedDocument } from "mongoose";

const locationSchema = new mongoose.Schema({
  country: String,
  city: String,
  region: String,
  timezone: String,
}, { _id: false });

const urlStatsSchema = new mongoose.Schema({
    slug: {
        type: String,
        index: true,
        required: true,
    },
    device: {
        type: String,
        enum:['mobile','desktop','tablet','unknown'],
        default:'unknown'
    },
    location: locationSchema,
    referrer: {
        type: String,
    },
    clickedAt:{
        type:Date,
        default: Date.now
    }

});

const urlStatsModel = mongoose.model('urlStatModel', urlStatsSchema);
type SlugUpdateType = HydratedDocument<InferSchemaType<typeof urlStatsSchema>>;

export { urlStatsModel };