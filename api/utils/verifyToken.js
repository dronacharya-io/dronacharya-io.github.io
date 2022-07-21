import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

//Checking if the user has access token.
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(404, "you are not authenticated");
  }

  //Checking if the token is correct.
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "token is not valid!"));
    req.user = user;
    next();
  });
};

//Verify the user.
//If verification successful then execute the script defined by calling the function.
export const verifyUser = (req, res, next) => {
  console.log(req.user);
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      if (err) return next(createError(403, "you are not authorized!"));
    }
  });
};

//Same as verifying the user.
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "you are not authorized!"));
    }
  });
};
