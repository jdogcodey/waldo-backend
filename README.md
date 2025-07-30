# waldo-backend

Backend of the Where's Waldo Project on The Odin Project

Rough plan/log:
I will handle homepage etc all on the homepage so won't need to make requests from the backend - hopefully saving some time and effort and complexity from my previous projects.

Database:

- Need to set up a db (prisma/sql)
- Model to contain the username and the time
- Model to create a session with the time to compare against when the request comes back

I don't think that there is anything else that I need to store - So ideally make it as simple as possible.

Routes/Controllers:

- POST create game:
  - Creates a session
  - Returns a unique game ID for the front end to return with the click location
- POST score:
  - Inputs - X, Y, Username, Time (Need to calculate time to complete on the backend)
  - Compares the X and Y to the coordinates in the database (Might be a separate function)
  - Calculates the time taken to click
  - Stores the score in the database
  - Returns success if they clicked on the correct area
- GET scores:
  - Gets the results from the database and returns them to the user

Initially I don't feel like this needs much more. Just need to make sure that I manage to get the coordinates and everything correct across devices etc. I think this can all be added in the front end.

Diary:

- Well that was a pain. Just spent ages trying to work out why I was getting a prisma generate Error. Thought that it was because I was importing the client wrong or something. Turns out that I had a custom output file from the prisma generator.
