import express from 'express'
import {authMiddleware, eventValidationMiddleware} from '../middlewares/userFunction.js';
import { createEvent, deleteEvent, updateEvent } from '../controllers/eventController.js';
import { activeUserMiddleware } from '../validations/userValidations.js';
const eventRouter = express.Router();

eventRouter.post("/createEvent", activeUserMiddleware,  eventValidationMiddleware,  authMiddleware, createEvent);
eventRouter.put("/updateEvent", activeUserMiddleware, authMiddleware, updateEvent);
eventRouter.delete("/deleteEvent", activeUserMiddleware, authMiddleware, deleteEvent);

export {
    eventRouter
}