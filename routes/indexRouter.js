import express from "express";
import indexController from "../controllers/indexController.js";

const router = express.Router();

router.post("/startgame", indexController.startGame);

router.post("/endgame", indexController.endGame);

router.get("/scores", indexController.getScore);

export default router;
