import { IUser } from './../types/IUsers.d';
import { mongoose } from "./../db.js";
import { emailRegex } from "../validator/basic.js";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    validate: [emailRegex],
    unique:true
  },
  password:{
      type:String,
      min:15
  },
  type:{
     type:Number,
     default:1 
  }
});

export const MUser = mongoose.model<IUser>("users", UserSchema);
