import express from 'express'
import { PrismaClient } from '@prisma/client'
const client = new PrismaClient();

// const followRoute = async(req, res)=>{
//     try{
//         const body = req.body;
//         const follow = client.follow.create({

//         })
//     }
// }