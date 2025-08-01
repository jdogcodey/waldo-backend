import prisma from "../config/prismaClient.js";

export default function addToLeaderboard(username, time) {
  prisma.scores.create({});
}
