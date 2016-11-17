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

  }

  playRound(keyPressed) {
    console.log("play");
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

    window.setTimeout(() => {
      if (this.grid.isGridFull()) this.gameOver();
    }, 200);
  }

  gameOver() {
    console.log("Game over");
    $("body").off("keydown");
  }

  removeMerged() {
    $(".merged").remove();
  }

}

export default Game;
