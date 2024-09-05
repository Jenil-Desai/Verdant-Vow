import express from 'express';
import { userFunction } from '../middlewares/userFunction.js'; // Ensure this path is correct
import { signin, signup } from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.post("/signup", userFunction, signup);
userRoute.post("/signin", signin);

export { userRoute };
