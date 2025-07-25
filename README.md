# waldo-backend

Backend of the Where's Waldo Project on The Odin Project

Rough plan/log:
I will handle homepage etc all on the homepage so won't need to make requests from the backend - hopefully saving some time and effort and complexity from my previous projects.

Database:

- Need to set up a db (prisma/sql)
- Needs to contain the username and the time

I don't think that there is anything else that I need to store - So ideally make it as simple as possible.

Routes/Controllers:

- POST score:
  - Inputs - X, Y, Username
  - Compares the X and Y to the coordinates in the database (Might be a separate function)
  - Returns success if they clicked on the correct area
- GET scores:
  - Gets the results from the database and returns them to the user

Initially I don't feel like this needs much more. Just need to make sure that I manage to get the coordinates and everything correct across devices etc. I think this can all be added in the front end.
