import express from 'express'
import { authMiddleware, followValidationMiddleware } from '../middlewares/userFunction.js';
import { followRoute, getFollower, getFollowing, unFollow } from '../controllers/followController.js';
import { activeUserMiddleware } from '../validations/userValidations.js';
const followRoutes = express.Router();

followRoutes.post("/follow", activeUserMiddleware, followValidationMiddleware,  authMiddleware, followRoute);
followRoutes.post("/unfollow", activeUserMiddleware, authMiddleware, unFollow);
followRoutes.get("/getFollowers", activeUserMiddleware,  authMiddleware, getFollower);
followRoutes.get("/getFollowing", activeUserMiddleware, authMiddleware, getFollowing)

export {
    followRoutes
}