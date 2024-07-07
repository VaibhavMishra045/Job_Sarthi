

// import { catchAsyncError } from "./catchAsyncError.js";
// import ErrorHandler from "./error.js";
// import jwt from "jsonwebtoken";
// import { User } from "../models/userSchema.js";

// export const isAuthorized = catchAsyncError(async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return next(new ErrorHandler("User not Authorized", 400));
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//   req.user = await User.findById(decoded.id);

//   if (!req.user) {
//     return next(new ErrorHandler("User not found", 404));
//   }

//   next();
// });

import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
  // Extract token from cookies
  const { token } = req.cookies;

  // If token doesn't exist, user is not authorized
  if (!token) {
    return next(new ErrorHandler("User not Authorized", 400));
  }

  try {
    // Verify the token using JWT_SECRET_KEY
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find user based on decoded ID from token
    const user = await User.findById(decoded.id);

    // If user not found, handle error
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Attach user object to request for further processing in route handlers
    req.user = user;

    // Call next middleware
    next();
  } catch (error) {
    // Handle JWT verification errors
    return next(new ErrorHandler("Invalid token", 401));
  }
});
