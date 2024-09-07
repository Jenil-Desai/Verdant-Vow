import express from 'express';
import checkEventStatus, { authMiddleware, eventValidationMiddleware } from '../middlewares/userFunction.js';
import { allEventsCompleted, allEventsPending, createEvent, deleteEvent, getEvent, getLevels, updateEvent } from '../controllers/eventController.js';
import { activeUserMiddleware } from '../validations/userValidations.js';

const eventRouter = express.Router();

// Route to create a new event
eventRouter.post("/createEvent", activeUserMiddleware, eventValidationMiddleware, authMiddleware, createEvent);

// Route to update an existing event
eventRouter.put("/updateEvent/:eventId", checkEventStatus, activeUserMiddleware, authMiddleware, updateEvent);

// Route to delete an event
eventRouter.delete("/deleteEvent/:eventId", checkEventStatus, activeUserMiddleware, authMiddleware, deleteEvent);

eventRouter.get("/completeEvents", checkEventStatus, activeUserMiddleware, authMiddleware, allEventsCompleted);

eventRouter.get("/incompleteEvents", checkEventStatus, activeUserMiddleware, authMiddleware, updateEvent);

eventRouter.get("/pendingEvents", checkEventStatus, activeUserMiddleware, authMiddleware, allEventsPending);

eventRouter.get("/getEvent", checkEventStatus, activeUserMiddleware, authMiddleware, getEvent);

eventRouter.get("/getLevels", checkEventStatus, activeUserMiddleware, authMiddleware, getLevels);

export { eventRouter };
