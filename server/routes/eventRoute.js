import express from 'express';
import checkEventStatus, { authMiddleware, eventValidationMiddleware } from '../middlewares/userFunction.js';
import { createEvent, deleteEvent, updateEvent } from '../controllers/eventController.js';
import { activeUserMiddleware } from '../validations/userValidations.js';

const eventRouter = express.Router();

// Route to create a new event
eventRouter.post("/createEvent", activeUserMiddleware, eventValidationMiddleware, authMiddleware, createEvent);

// Route to update an existing event
eventRouter.put("/updateEvent/:eventId", checkEventStatus, activeUserMiddleware, authMiddleware, updateEvent);

// Route to delete an event
eventRouter.delete("/deleteEvent/:eventId", checkEventStatus, activeUserMiddleware, authMiddleware, deleteEvent);

export { eventRouter };
