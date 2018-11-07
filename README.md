# Memory

## Getting Started

Use  `npm run dev` or `yarn run dev`  to start the development server! You can
view the app at `localhost:3000`.

* Click on any one of the face down cards to begin the game!
* The cards in the header indicate each pair of cards you've successfully removed
  from the game.
* Use the dropdown to change the difficulty of the game. Doing this mid game will
  reset the game using the new setting you've chosen.
* When you've completed the game, refresh your browser window to replay! Alteratively,
  you can change the difficulty to begin a new game.

* If webpack.base.js in node_modules/kyt/config throws an error, please add a callback
  to the fs.writeFile function in line 72!