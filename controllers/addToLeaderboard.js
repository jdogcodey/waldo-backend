import prisma from "../config/prismaClient.js";

export default async function addToLeaderboard(username, time) {
  try {
    console.log(username);
    console.log(time);
    const inDatabase = await prisma.scores.create({
      data: {
        username: username,
        completionTime: time,
      },
    });
    return inDatabase;
  } catch (err) {
    return false;
  }
}
