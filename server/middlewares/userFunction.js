import express from 'express'
import { userValidation } from '../validations/userValidations.js'
import jwt from 'jsonwebtoken';

const userFunction = (req, res, next)=>{
    const validate = userValidation.validate(req.body)
    if(!validate){
        return res.json({
            message: "Send Data in the correct format"
        })
    }
    next()
}

const authMiddleware = (req, res, next) => {
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

export {
    authMiddleware
}


export {
    userFunction
    
}