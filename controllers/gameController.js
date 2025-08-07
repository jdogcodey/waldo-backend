import "dotenv/config";

export default function gameController(inputX, inputY) {
  console.log(inputX);
  console.log(inputY);
  const differenceX = Math.abs(process.env.X - inputX);
  const differenceY = Math.abs(process.env.Y - inputY);
  if (differenceX + differenceY < process.env.ALLOWED_LEEWAY) {
    return true;
  } else return false;
}
