import prisma from "../config/prismaClient.js";
import {
  differenceInMilliseconds,
  differenceInSeconds,
  formatDistanceToNowStrict,
} from "date-fns";
import gameController from "./gameController.js";
import addToLeaderboard from "./addToLeaderboard.js";

const indexController = {
  // Function to begin a game session and return the ID to the user
  startGame: async (req, res, next) => {
    console.log("game started");
    let session;
    try {
      //Creating the session within the database
      session = await prisma.gameSession.create({ data: {} });
    } catch (err) {
      // Error handler
      res.status(500).json({
        success: false,
        message: "Error creating the game",
        errors: err,
      });
    }
    // Let the user know the session has been created and send them the session ID - to be returned with the finished game
    res.status(201).json({
      success: true,
      message: "Game session created",
      data: {
        session: session.id,
      },
    });
  },
  // Ending the game - if successful then will add to leaderboard
  endGame: async (req, res, next) => {
    let originalGame;
    try {
      // Checking that they have a legitimate game session
      originalGame = await prisma.gameSession.findUnique({
        where: {
          id: req.body.id,
        },
      });
    } catch (err) {
      // Error handler
      res.status(500).json({
        success: false,
        message: "Error ending the game",
        errors: err,
      });
    }
    // If they give an incorrect session ID then return with a 404 not found
    if (!originalGame) {
      res.status(404).json({
        success: false,
        message: "Incorrect game session ID",
      });
    } else {
      // Delete the game session
      await prisma.gameSession.delete({
        where: {
          id: req.body.id,
        },
      });
      // Testing if their X and Y clicks are within the bounds allowed. If they didn't win then they get handled differently
      if (gameController(req.body.x, req.body.y)) {
        // We now know that they have a legitimate game AND they won that game - so let's work out how long since they started
        const lengthOfGame = differenceInMilliseconds(
          new Date(),
          new Date(originalGame.createdAt)
        );
        const inLeaderboard = await addToLeaderboard(
          req.body.username,
          lengthOfGame
        );

        if (!inLeaderboard) {
          return res.status(500).json({
            success: false,
            message: "Score couldn't be added to the Leaderboard",
          });
        }
        // Will likely send the updated leaderboard as well
        res.status(201).json({
          success: true,
          message: "You found Waldo!",
          data: {
            userResult: inLeaderboard,
          },
        });
      } else {
        res.status(200).json({
          success: true,
          message: "You failed to find Waldo!",
          data: {
            userResult: null,
          },
        });
      }
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
      message: "Updated scores",
      data: {
        scores: scores,
      },
    });
  },
};

export default indexController;
