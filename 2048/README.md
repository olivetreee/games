# 2048

## Description

2048 is a simple tiles game with straightforward controls and a flat learning curve. The difficulty, however, increases after each play, making it engaging and challenging.

The game starts with a 4x4 grid, where two tiles are placed at random positions. Both tiles have the value 2. By using the arrow keys, the player must move the tiles around the board until they are merged together. When that happens, they become a single tile, with value 4. After each move, a new tile is spawned on the grid, again at a random position. The new tile will have a random value of either 2 or 4.

Pressing an arrow key moves all of the tiles at the same time, so the player doesn't have control over individual tiles, but only of the grid as a whole.

The goal is to add up tiles with the same value to make higher and higher values until the player hits 2048 or the grid becomes full by other spawned tiles.

## MVP Features
The beauty of the game is its simplicity. Therefore, not many features are planned:

* Reset the grid;
* Select difficulty;
* Choose color scheme
* Production Readme



## Difficulties
**Easy:** The game ends at 512 instead of 2048;
**Normal:** The game ends at 2048;
**Hard:** Same as Normal + At random times, instead of spawning a 2 or 4 tile, a bomb tile appears. It will eliminate whichever tile it touches after the next move;
**Impossible:** Same as Hard + Arrow keys commands are reversed


## Bonus
* Play relaxing music (sundcloud API)
