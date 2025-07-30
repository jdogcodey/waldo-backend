import prisma from "../config/prismaClient.js";

const indexController = {
  startGame: async (req, res, next) => {
    let session;
    try {
      session = await prisma.gameSession.create();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error creating the game",
        errors: err,
      });
    }
    let sessionID = session.id;
    res.status(201).json({
      success: true,
      message: "Game session created",
      data: {
        session: session.id,
      },
    });
  },
  endGame: (req, res, next) => {},
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
