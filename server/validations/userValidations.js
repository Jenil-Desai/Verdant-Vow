import Joi from "joi";

// User Validation Schema
const userValidation = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

// Event Validation Schema
const eventValidation = Joi.object({
  eventName: Joi.string().min(3).required(),
  eventDays: Joi.number().integer().positive().required(),
  dayFrequency: Joi.number().integer().positive().required(),
});

// Follow Validation Schema
const followValidation = Joi.object({
  followId: Joi.string().uuid().required(), // Assuming followId is a UUID string type
});

const postValidation = Joi.object({
  eventId: Joi.string().uuid().required(),
  levelId: Joi.string().uuid().required(),
  image: Joi.string().uri().required(),
  content: Joi.string().required(),
});

export { userValidation, eventValidation, followValidation};
