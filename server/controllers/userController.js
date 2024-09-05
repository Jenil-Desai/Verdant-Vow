// userController.js
import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const client = new PrismaClient();

const signup = async (req, res) => {
  try {
    const body = req.body;
    const existingUser = await client.user.findFirst({
      where: {
        username: body.username,
      },
    });

    if (existingUser) {
      return res.json({
        message: "User with the given username is already registered",
      });
    }
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRound)
    const createUser = await client.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword
      },
    });

    const token = jwt.sign({ email: createUser.email, userId: createUser.id }, process.env.JWT_SECRET);
    res.json({
      token,
    });
  } catch (e) {
    console.log("Signup error", e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const signin = async (req, res) => {
  try {
    const body = req.body
    const usernameCheck = await client.user.findFirst({
        where: {
            username: body.username
        }
    })
    if (!usernameCheck){
        return res.json({
            message: "Username or Password is incorrect"
        })
    }
    const comparePassword = await bcrypt.compare(body.password, usernameCheck.password)
    if (!comparePassword){
        return res.json({
            message: "username or password is incorrect"
        })
    }
    const token = jwt.sign({email: usernameCheck.email, userId: usernameCheck.id}, process.env.JWT_SECRET)
    res.json({ message: token});
  } catch (e) {
    console.log("Signin error", e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { signup, signin };
