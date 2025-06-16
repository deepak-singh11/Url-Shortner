import mongoose, {InferSchemaType,HydratedDocument} from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:4,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    profileImage:{
        type:String,
    },
    joinedAt:{
        type:Date,
        default:Date.now(),
    }
    
});

const userModel=mongoose.model("userModel",userSchema);

type UserModalDocType=HydratedDocument<InferSchemaType<typeof userSchema>>;

export {userModel,UserModalDocType};