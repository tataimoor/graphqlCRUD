import { Comments } from './../types/Comments.d';
import { mongoose } from "./../db.js";
import { emailRegex } from "../validator/basic.js";
const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required:true
  }, 
   email: {
    type: String,
    required:true
  }, 
   name: {
    type: String,
    required:true
  },
  CreatedDate: {
    type: String,
    required:true
  }
});

export const MComments = mongoose.model<Comments>("comments", CommentSchema);
