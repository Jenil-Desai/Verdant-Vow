import express from 'express';
import { authMiddleware, userValidationMiddleware } from '../middlewares/userFunction.js';
import { signin, signup, verifyOTP, forgotPassword, resetPassword, getUsername } from '../controllers/userController.js';
import { activeUserMiddleware } from '../validations/userValidations.js';

const userRoute = express.Router();

// Route for user signup with validation
userRoute.post("/signup", userValidationMiddleware, signup);

// Route for user signin
userRoute.post("/signin", signin);

// Route for OTP verification
userRoute.post("/verify-otp", verifyOTP);

// Route for password recovery
userRoute.post("/forgot-password", forgotPassword);

// Route for password reset
userRoute.post("/reset-password", resetPassword);

userRoute.get("/getUsers", activeUserMiddleware, authMiddleware, getUsername);

export { userRoute };
