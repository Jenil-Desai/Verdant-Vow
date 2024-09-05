import express from 'express'
import { authMiddleware, followValidationMiddleware } from '../middlewares/userFunction.js';
import { followRoute, getFollower, getFollowing, unFollow } from '../controllers/followController.js';
const followRoutes = express.Router();

followRoutes.post("/follow", followValidationMiddleware,  authMiddleware, followRoute);
followRoutes.post("/unfollow", authMiddleware, unFollow);
followRoutes.get("/getFollowers", authMiddleware, getFollower);
followRoutes.get("/getFollowing", authMiddleware, getFollowing)

export {
    followRoutes
}