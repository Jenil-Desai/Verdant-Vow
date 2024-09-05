import express from 'express'
import { authMiddleware, postValidationMiddleware} from '../middlewares/userFunction.js';
import { createPost, deletePost, updatePost } from '../controllers/postController.js';

const postRoute = express.Router();

postRoute.post("/createPost",   authMiddleware, createPost)
postRoute.put("/updatePost", authMiddleware, updatePost)
postRoute.delete("/deletePost", authMiddleware, deletePost)

export{
    postRoute
}