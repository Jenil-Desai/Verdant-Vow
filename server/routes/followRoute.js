import express from 'express'
import { authMiddleware } from '../middlewares/userFunction';
const followRoutes = express.Router();

followRoutes.post("/follow", authMiddleware)