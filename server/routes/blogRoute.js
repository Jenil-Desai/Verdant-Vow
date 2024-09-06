import express from 'express';
import { authMiddleware } from '../middlewares/userFunction.js';
import { commentBlog, createBlog, deleteBlog, deleteComment, editComment, likeBlog, unlikeBlog, updateBlog } from '../controllers/blogController.js';
import { activeUserMiddleware } from '../validations/userValidations.js';
const blogRouter = express.Router();

blogRouter.post("/createBlog", activeUserMiddleware, authMiddleware, createBlog);
blogRouter.put("/updateBlog", activeUserMiddleware, authMiddleware, updateBlog);
blogRouter.delete("/deleteBlog", activeUserMiddleware,authMiddleware, deleteBlog);
blogRouter.post("/like", activeUserMiddleware, authMiddleware, likeBlog);
blogRouter.put("/unLike", activeUserMiddleware, authMiddleware, unlikeBlog);
blogRouter.post("/comment", activeUserMiddleware, authMiddleware, commentBlog);
blogRouter.put("/updateComment", activeUserMiddleware, authMiddleware, editComment);
blogRouter.delete("/deleteComment", activeUserMiddleware, authMiddleware, deleteComment);

export {blogRouter}