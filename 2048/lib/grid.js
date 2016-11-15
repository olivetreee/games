import $ from "jquery";
import Tile from "./tile";

class Grid {

  constructor(game, $gridEl) {
    this.game = game;
    this.$gridEl = $gridEl;

    this.drawGrid();

    this.filledPositions = {};

    // Spawns the first 2 tiles
    this.spawnTile();
    this.spawnTile();
  }

  drawGrid() {
    const $gridContainer = $("<div class='grid-container'>");

    let $gridRow;

    for (let row = 1; row < 5; row++) {
      $gridRow = $("<div class='grid-row clearfix'>");
      for (let cell = 1; cell < 5; cell++) {
        let $gridCell = $("<div class='grid-cell'>");
        $gridRow.append($gridCell);
      }
      $gridContainer.append($gridRow);
    }
    this.$gridEl.append($gridContainer);
  }

  spawnTile() {
    const pos = this.randomPosition();
    this.filledPositions[pos] = true;
  }


  randomPosition() {
    let row, col;

    do {
      row = Math.floor(Math.random()*4)+1;
      col = Math.floor(Math.random()*4)+1;
    }
    while ( this.positionTaken(row, col) );

    return this.posToString(row, col);
  }

  positionTaken(r,c) {
    return this.filledPositions[this.posToString(r,c)];
  }

  posToString(r,c) {
    return `${r}${c}`;
  }


}

export default Grid;
