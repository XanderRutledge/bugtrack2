import mongoose from "mongoose";
import ProfileSchema from "../models/Profile";
import BugSchema from "../models/Bug";
import CommentSchema from "../models/Comment";

class DbContext {
  Profile = mongoose.model("Profile", ProfileSchema);
  Bugs = mongoose.model("Bug", BugSchema);
  Comments = mongoose.model("Comment", CommentSchema)
}

export const dbContext = new DbContext();
