import express from 'express';
import { authMiddleware, postValidationMiddleware } from '../middlewares/userFunction.js';
import { createPost, deletePost, getAllPosts, updatePost } from '../controllers/postController.js';
import { activeUserMiddleware } from '../validations/userValidations.js';

const postRoute = express.Router();

// Route to create a post
postRoute.post("/createPost", activeUserMiddleware, postValidationMiddleware, authMiddleware, createPost);

// Route to update a post
postRoute.put("/updatePost", activeUserMiddleware, authMiddleware, updatePost);

// Route to delete a post
postRoute.delete("/deletePost", activeUserMiddleware, authMiddleware, deletePost);

postRoute.get("/getAllPost", activeUserMiddleware, authMiddleware, getAllPosts);

export { postRoute };
