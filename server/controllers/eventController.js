import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import dayjs from 'dayjs'; 
import { eventRouter } from '../routes/eventRoute';

const client = new PrismaClient();

const createEvent = async (req, res) => {
  try {
    const body = req.body;
    const { eventName, eventDays, dayFrequency } = body;

    console.log(req.userId)
    const event = await client.event.create({
      data: {
        eventName,
        eventDays,
        dayFrequency,
        status: "PENDING",
        userId: req.userId,

      }
    });

    
    const levelsCount = Math.ceil(eventDays / dayFrequency);

   
    const startDate = new Date();
    for (let i = 1; i <= levelsCount; i++) {
      const dueDate = dayjs(startDate).add((i - 1) * dayFrequency, 'day').toDate();

      await client.level.create({
        data: {
          eventId: event.id,
          levelNumber: i,
          dueDate: dueDate,
          isCompleted: false
        }
      });
    }

    res.status(201).json({
      message: "Event created successfully with levels and due dates.",
      event
    });
  } catch (e) {
    console.error("Error creating event:", e);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

const updateEvent = async (req, res)=>{
    try {
        const body = req.body;
        const { eventName, eventDays, dayFrequency } = body;
    
        console.log(req.userId)
        const event = await client.event.update({
            where:{
                userId: req.userId,
                id: req.body.id
            },
            data: {
                eventName,
                eventDays,
                dayFrequency,
                status: "PENDING",
                userId: req.userId,
            }
        });
    
        
        const levelsCount = Math.ceil(eventDays / dayFrequency);
    
       
        const startDate = new Date();
        for (let i = 1; i <= levelsCount; i++) {
          const dueDate = dayjs(startDate).add((i - 1) * dayFrequency, 'day').toDate();
    
          await client.level.create({
            data: {
              eventId: event.id,
              levelNumber: i,
              dueDate: dueDate,
              isCompleted: false
            }
          });
        }
    
        res.status(201).json({
          message: "Event created successfully with levels and due dates.",
          event
        });
      } catch (e) {
        console.error("Error creating event:", e);
        res.status(500).json({
          message: "Internal Server Error"
        });
      }
}
const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const findEvent = await client.event.findFirst({
      where: {
        id: eventId,
      },
    });

    if (!findEvent) {
      return res.status(404).json({
        message: "Event does not exist",
      });
    }

    await client.$transaction(async (prisma) => {
      await prisma.level.deleteMany({
        where: {
          eventId: findEvent.id,
        },
      });

      await prisma.event.delete({
        where: {
          id: findEvent.id,
        },
      });
    });

    res.json({
      message: "Event and associated levels successfully deleted",
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      message: "An error occurred while deleting the event",
      error: error.message,
    });
  } finally {
    await client.$disconnect();
  }
};

export {
  deleteEvent
}

export{
  updateEvent
}

export {
    createEvent
}
