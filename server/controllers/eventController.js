import express from 'express';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs'; 

const client = new PrismaClient();

const createEvent = async (req, res) => {
  try {
    const { eventName, eventDays, dayFrequency } = req.body;

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
          dueDate,
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

const updateEvent = async (req, res) => {
  try {
    const { id, eventName, eventDays, dayFrequency } = req.body;

    const event = await client.event.findFirst({
      where: {
        id,
        userId: req.userId
      },
    });

    if (!event) {
      return res.status(403).json({
        message: "Event does not exist or you are not authorized to update this event."
      });
    }

    const updatedEvent = await client.event.update({
      where: { id },
      data: {
        eventName,
        eventDays,
        dayFrequency,
        status: "PENDING",
      },
    });

    const levelsCount = Math.ceil(eventDays / dayFrequency);
    const existingLevels = await client.level.findMany({
      where: { eventId: updatedEvent.id },
    });

    for (const level of existingLevels) {
      if (level.levelNumber > levelsCount && !level.isCompleted) {
        await client.level.delete({
          where: { id: level.id },
        });
      }
    }

    const startDate = new Date();
    for (let i = 1; i <= levelsCount; i++) {
      const dueDate = dayjs(startDate).add((i - 1) * dayFrequency, 'day').toDate();

      const existingLevel = existingLevels.find(
        (level) => level.levelNumber === i
      );

      if (existingLevel) {
        if (!existingLevel.isCompleted) {
          await client.level.update({
            where: { id: existingLevel.id },
            data: { dueDate },
          });
        }
      } else {
        await client.level.create({
          data: {
            eventId: updatedEvent.id,
            levelNumber: i,
            dueDate,
            isCompleted: false,
          },
        });
      }
    }

    res.status(201).json({
      message: "Event updated successfully with adjusted levels and due dates.",
      updatedEvent,
    });
  } catch (e) {
    console.error("Error updating event:", e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await client.event.findFirst({
      where: {
        id: eventId,
        userId: req.userId
      },
    });

    if (!event) {
      return res.status(403).json({
        message: "Event does not exist or you are not authorized to delete this event."
      });
    }

    await client.$transaction(async (prisma) => {
      await prisma.level.deleteMany({
        where: { eventId: event.id },
      });

      await prisma.event.delete({
        where: { id: event.id },
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
  createEvent,
  updateEvent,
  deleteEvent
};
