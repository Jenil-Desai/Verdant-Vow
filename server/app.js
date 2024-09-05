import express from 'express';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import dotenv from 'dotenv';
import { eventRouter } from './routes/eventRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRoute);
app.use("/api/v1/event", eventRouter)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
