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

    this.gamePoints = 0;

    $("body").keydown( event => {
      event.preventDefault();
      const keyPressed = this.keyCodes[event.which];
      if (keyPressed) this.playRound(keyPressed)
    });

    $(".title h1").click( () => this.newGame() );

  }

  playRound(keyPressed) {


    this.grid.roundPoints= 0;
    this.removeMerged();
    this.grid.searchTilesToMerge(keyPressed);
    this.grid.moveTiles(keyPressed);
    this.grid.renderDom();
    this.grid.spawnTile();
    this.updateScore();

    if (this.grid.roundPoints) {
      this.flashRoundPoints();
    }

    // window.setTimeout(() => {
      if (this.grid.isGridFull()) this.gameOver();
    // }, 200);

    if (this.grid.isBeatingScore(2048)) this.youWin();
  }

  newGame() {
    $(".tile").remove();
    this.grid.newGrid();

    this.gamePoints = 0;
    this.updateScore();

    $(".game-over").remove();

    $("body").keydown( event => {
      const keyPressed = this.keyCodes[event.which];
      if (keyPressed) this.playRound(keyPressed)
    });

  }

  flashRoundPoints() {
    const bubble = document.getElementsByClassName("points-bubble")[0];
    $(bubble).text(this.grid.roundPoints);
    bubble.animate({
      opacity: [0,1,0],
      transform: ["none", "translateY(-50px)"]
    }, {
      // Iterations last for 500ms.
      duration: 500,

      // The timing function to use with each iteration.
      easing: 'linear'
    });
  }

  updateScore() {
    this.gamePoints += this.grid.roundPoints;
    $(".game-score span").text(this.gamePoints);
  }

  gameOver() {
    const $gameOver = $(`<section class="game-over">
            <h2>Game Over</h2>
            <h3>Click the logo to start a new game</h3>
          </section>`)

    $("#game").append($gameOver);
    $("body").off("keydown");
  }

  youWin() {
    $("body").off("keydown");
    const $gameOver = $(`<section class="game-over">
            <h2>You Win!</h2>
            <h3>Click the logo to start a new game</h3>
          </section>`)

    $("#game").append($gameOver);
  }

  removeMerged() {
    $(".merged").remove();
  }

}

export default Game;
