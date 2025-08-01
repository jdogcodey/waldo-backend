import prisma from "../config/prismaClient.js";
import { formatDistanceToNowStrict } from "date-fns";

const indexController = {
  startGame: async (req, res, next) => {
    let session;
    try {
      session = await prisma.gameSession.create({ data: {} });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error creating the game",
        errors: err,
      });
    }
    res.status(201).json({
      success: true,
      message: "Game session created",
      data: {
        session: session.id,
      },
    });
  },
  endGame: async (req, res, next) => {
    // Compare X and Y with database
    // If further out than the tolerance then return that they failed
    let originalGame;
    try {
      originalGame = await prisma.gameSession.findUnique({
        where: {
          id: req.body.id,
        },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error ending the game",
        errors: err,
      });
    }
    if (!originalGame) {
      res.status(404).json({
        success: false,
        message: "Incorrect game session ID",
        errors: err,
      });
    } else {
      const lengthOfGame = formatDistanceToNowStrict(
        new Date(originalGame.createdAt)
      );
      // Add to leaderboard
      res.status(201).json({
        success: true,
        message: "You found Waldo!",
        data: {
          timeToFind: lengthOfGame,
        },
      });
    }
  },
  getScore: async (req, res, next) => {
    let scores;
    try {
      scores = await prisma.scores.findMany(); // This is far too vague in general. Should be using some form of pagination - this is fine for now.
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error getting the scores",
        errors: err,
      });
    }
    res.status(200).json({
      success: true,
      message: "Updates scores",
      data: {
        scores: scores,
      },
    });
  },
};

export default indexController;
