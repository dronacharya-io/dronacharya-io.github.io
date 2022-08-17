import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber : {
      type: Array,
      required: false,
      unique: true,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    quizzesCreated: {
      type: Array,
      default: [],
    },
    quizzesSubmitted: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
