import mongoose from "mongoose";
import { urlRegex } from "../validations/validations.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => urlRegex.test(v),
      message: "Please enter a valid URL for the avatar.",
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
