import { Types } from "mongoose";
import { UrlDocType } from '../../model/urlModel.js';
import { UserModalDocType } from '../../model/userModel.js'

declare global {
  namespace Express {
    interface Request {
      userId: Types.ObjectId,
      slugDoc: UrlDocTyp
      userDoc: UserModalDocType,
    }
  }
}

export { }; // VERY IMPORTANT: marks this as a module
