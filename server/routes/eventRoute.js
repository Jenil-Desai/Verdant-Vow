import express from 'express'
import checkEventStatus, {authMiddleware, eventValidationMiddleware} from '../middlewares/userFunction.js';
import { createEvent, deleteEvent, updateEvent } from '../controllers/eventController.js';
import { activeUserMiddleware } from '../validations/userValidations.js';
const eventRouter = express.Router();

eventRouter.post("/createEvent", activeUserMiddleware,  eventValidationMiddleware,  authMiddleware, createEvent);
eventRouter.put("/updateEvent", checkEventStatus,  activeUserMiddleware, authMiddleware, updateEvent);
eventRouter.delete("/deleteEvent", checkEventStatus,  activeUserMiddleware, authMiddleware, deleteEvent);

export {
    eventRouter
}