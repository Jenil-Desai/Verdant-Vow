import express from 'express';
import { authMiddleware } from '../middlewares/userFunction.js';
import { commentBlog, createBlog, deleteBlog, deleteComment, editComment, likeBlog, unlikeBlog, updateBlog } from '../controllers/blogController.js';
import { activeUserMiddleware } from '../validations/userValidations.js';

const blogRouter = express.Router();

// Route to create a new blog
blogRouter.post("/createBlog", activeUserMiddleware, authMiddleware, createBlog);

// Route to update an existing blog
blogRouter.put("/updateBlog/:blogId", activeUserMiddleware, authMiddleware, updateBlog);

// Route to delete a blog
blogRouter.delete("/deleteBlog/:blogId", activeUserMiddleware, authMiddleware, deleteBlog);

// Route to like a blog
blogRouter.post("/likeBlog/:blogId", activeUserMiddleware, authMiddleware, likeBlog);

// Route to unlike a blog
blogRouter.post("/unlikeBlog/:blogId", activeUserMiddleware, authMiddleware, unlikeBlog);

// Route to add a comment to a blog
blogRouter.post("/comment/:blogId", activeUserMiddleware, authMiddleware, commentBlog);

// Route to update a comment on a blog
blogRouter.patch("/updateComment/:commentId", activeUserMiddleware, authMiddleware, editComment);

// Route to delete a comment from a blog
blogRouter.delete("/deleteComment/:commentId", activeUserMiddleware, authMiddleware, deleteComment);

export { blogRouter };
