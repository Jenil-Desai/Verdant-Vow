import express from 'express';
import { userValidationMiddleware } from '../middlewares/userFunction.js';
import { signin, signup, verifyOTP, forgotPassword, resetPassword } from '../controllers/userController.js';

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

export { userRoute };
