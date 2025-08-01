import prisma from "../config/prismaClient.js";

export default async function addToLeaderboard(username, time) {
  try {
    console.log(username);
    console.log(time);
    await prisma.scores.create({
      data: {
        username: username,
        completionTime: time,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}
