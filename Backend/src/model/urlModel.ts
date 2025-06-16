import mongoose,{InferSchemaType,HydratedDocument} from "mongoose";

const urlSchema=new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    createdAt:{
        type:Date,
        default:Date.now  
    },
    expiresAt:{
        type:Date,
        index:{expires:0}
    },
    clickLimit:{
        type:Number,
        default:10000
    },
    clickCount:{
        type:Number,
        default:0
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
    }
});

const urlModel= mongoose.model("Url",urlSchema);
type UrlDocType = HydratedDocument<InferSchemaType<typeof urlSchema>>;

export {urlModel, UrlDocType};