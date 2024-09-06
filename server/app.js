import express from 'express';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import dotenv from 'dotenv';
import { eventRouter } from './routes/eventRoute.js';
import { followRoutes } from './routes/followRoute.js';
import { postRoute } from './routes/postRoute.js';
import { blogRouter } from './routes/blogRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Register routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/event', eventRouter);
app.use('/api/v1/follow', followRoutes);
app.use('/api/v1/post', postRoute);
app.use("/api/v1/blog", blogRouter);

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  } else if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized access' });
  } else if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({ message: 'Database error', details: err.message });
  }

  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
