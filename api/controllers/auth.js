import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Getting new user data.
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    //Saving it in database.
    await newUser.save();
    res.status(200).send("user has been created!");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    //Finding user by username in database.
    const user = await User.findOne({ username: req.body.username });
    if (!User) return next(createError(404, "User not found!"));

    //Comparing the passwords from databse and request.
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username"));

    //Creating a JWT token.
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    //Slicing the data to remove password and admin status.
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
