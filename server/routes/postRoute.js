import express from 'express'
import { authMiddleware, postValidationMiddleware} from '../middlewares/userFunction.js';
import { createPost, deletePost, updatePost } from '../controllers/postController.js';
import { activeUserMiddleware } from '../validations/userValidations.js';

const postRoute = express.Router();

postRoute.post("/createPost", activeUserMiddleware, authMiddleware, createPost)
postRoute.put("/updatePost", activeUserMiddleware, authMiddleware, updatePost)
postRoute.delete("/deletePost", activeUserMiddleware, authMiddleware, deletePost)

export{
    postRoute
}