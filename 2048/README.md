# 2048

## Description
2048 is a simple tiles game with straightforward controls and a flat learning curve. The difficulty, however, increases after each play, making it engaging and challenging.

The game starts with a 4x4 grid, where two tiles are placed at random positions. Both tiles have the value 2. By using the arrow keys, the player must move the tiles around the board until they are merged together. When that happens, they become a single tile, with value 4. After each move, a new tile is spawned on the grid, again at a random position. The new tile will have a random value of either 2 or 4.

Pressing an arrow key moves all of the tiles at the same time, so the player doesn't have control over individual tiles, but only of the grid as a whole.

The goal is to add up tiles with the same value to make higher and higher values until the player hits 2048 or the grid becomes full by other spawned tiles.

## MVP Features
One of the best traits of the game is its simplicity. Therefore, adding features just for the sake of it is not a good approach. Other than main gameplay, the following are planned as main features:

* Reset the grid;
* Player's top score;
* Production Readme


## Wireframes
The game consists of a single screen, where the grid is shown, as well as difficulty picker and basic instructions.

![2048 wireframe](../2048.png)


## Technologies
The game will be implemented using:

* HTML/CSS for UI;
* Vanilla JavaScript ES6 and jQuery for overall structure and game logic;
* Webpack to bundle and serve up the various scripts;

The structure of the files will broken as follows:
* `index.html`, with the main HTML code for the game;
* `index.css`, with main styling;
* `2048.js`, as webpack's entry file;
* `game.js`, with the main game logic, such as makeMove, gameWon etc;
* `grid.js`, which controls the grid itself;
* `tile.js`, with all the logic for the tiles. Each one will be an instance of this class.


## Timeline

**Day 1:** Setup file structure and barebones, webpack and package.json config files. Basic HTML/CSS grid.
By EOD, have:
* green webpack;
* blank page with grid laid out.

**Day 2:** Work on `tile.js` logic, methods, params and HTML/CSS for the class.
By EOD, have:
* completed `tile.js` logic;
* completed tile style.

**Day 3:** Write out `grid.js` class with movement logic and win/loose checks.
By EOD, have:
* full `Grid` class, with the ability to spawn, move and merge tiles;
* better UI for the grid

**Day 4:** Complete `game.js`, main controller interface and polish UI.
By EOD, have:
* playable game with all MVP features listed above.


## Bonus features

Although the original game doesn't have some of these features, their addition would make for a more interesting gameplay, specially the difficulty selector:
* Select difficulty;
* Game state is persisted after each move, so player can close the tab and continue later;
* Play stimulating musics (SoundCloud API);
* Choose color scheme;

### Difficulties
4 levels are planned:
**Easy:** The game ends at 512 instead of 2048;
**Normal:** The game ends at 2048;
**Hard:** Same as Normal + At random times, instead of spawning a 2 or 4 tile, a bomb tile appears. It will eliminate whichever tile it touches after the next move;
**Impossible:** Same as Hard + Arrow keys commands are reversed
