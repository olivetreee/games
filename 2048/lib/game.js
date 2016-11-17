//On each move, add class to the tile with:
// • position .pos-2-1, with transform rule to the relevant position
// • value .val-4, with rules to set the color depending on the value

import $ from "jquery";
import Grid from "./grid";

class Game {

  constructor(grid) {

    this.grid = grid;

    this.keyCodes = {
      38: "UP",
      40: "DOWN",
      37: "LEFT",
      39: "RIGHT"
    }

    $("body").keydown( event => {
      const keyPressed = this.keyCodes[event.which];
      if (keyPressed) this.playRound(keyPressed)
    });

    $(".new-game-btn").click( () => this.newGame() );

  }

  playRound(keyPressed) {
    // debugger
    this.removeMerged();
    // debugger
    this.grid.searchTilesToMerge(keyPressed);
    // debugger
    this.grid.moveTiles(keyPressed);
    // debugger
    this.grid.renderDom();
    // debugger
    this.grid.spawnTile();

    // window.setTimeout(() => {
      if (this.grid.isGridFull()) this.gameOver();
    // }, 200);

    if (this.grid.isBeatingScore(2048)) this.youWin();
  }

  newGame() {
    $(".tile").remove();
    this.grid.newGrid();

  }

  gameOver() {
    console.log("Game over");
    $("body").off("keydown");
  }

  youWin() {
    console.log("You Win!");
    $("body").off("keydown");
  }

  removeMerged() {
    $(".merged").remove();
  }

}

export default Game;
