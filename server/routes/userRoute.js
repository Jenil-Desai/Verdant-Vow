import express from 'express';
import { userValidationMiddleware } from '../middlewares/userFunction.js';
import { signin, signup, verifyOTP, forgotPassword, resetPassword } from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.post("/signup", userValidationMiddleware, signup);
userRoute.post("/signin", signin);
userRoute.post("/verify-otp", verifyOTP);
userRoute.post("/forgot-password", forgotPassword);
userRoute.post("/reset-password", resetPassword);

export { userRoute };
