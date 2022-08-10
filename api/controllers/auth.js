import User from "../models/user.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const newUser = new User({
      ...req.body,
    });

    await newUser.save();
    const { isAdmin, ...otherDetails } = newUser._doc;
    res.status(200).json({ details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));
    const { isAdmin, ...otherDetails } = user._doc;
    res.status(200).json({ details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};
