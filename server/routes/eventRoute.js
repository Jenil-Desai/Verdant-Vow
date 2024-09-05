import express from 'express'
import {authMiddleware, eventValidationMiddleware} from '../middlewares/userFunction.js';
import { createEvent, deleteEvent, updateEvent } from '../controllers/eventController.js';
const eventRouter = express.Router();

eventRouter.post("/createEvent", eventValidationMiddleware,  authMiddleware, createEvent);
eventRouter.put("/updateEvent", authMiddleware, updateEvent);
eventRouter.delete("/deleteEvent", authMiddleware, deleteEvent);

export {
    eventRouter
}