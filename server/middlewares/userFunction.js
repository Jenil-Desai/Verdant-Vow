import Joi from 'joi';
import jwt from 'jsonwebtoken';

// User validation schema
const userValidation = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

// Event validation schema
const eventValidation = Joi.object({
  eventName: Joi.string().min(3).required(),
  eventDays: Joi.number().integer().positive().required(),
  dayFrequency: Joi.number().integer().positive().required(),
});

// Follow validation schema
const followValidation = Joi.object({
  followId: Joi.string().uuid().required(),
});

// Middleware for user validation
export const userValidationMiddleware = (req, res, next) => {
  const { error } = userValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Send data in the correct format",
      details: error.details,
    });
  }
  next();
};

// Middleware for event validation
export const eventValidationMiddleware = (req, res, next) => {
  const { error } = eventValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Send event data in the correct format",
      details: error.details,
    });
  }
  next();
};

// Middleware for follow validation
export const followValidationMiddleware = (req, res, next) => {
  const { error } = followValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Send follow data in the correct format",
      details: error.details,
    });
  }
  next();
};

export const postValidation = Joi.object({
  userId: Joi.string().uuid().required(),
  eventId: Joi.string().uuid().required(),
  levelId: Joi.string().uuid().required(),
  image: Joi.string().uri().required(), // Assuming image is a URL
  content: Joi.string().required(),
});

// Middleware for JWT authentication
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.userId = decoded.userId;
      next();
    });
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
