import $ from "jquery";
import Tile from "./tile";

class Grid {

  constructor(game, $gridEl) {
    this.game = game;
    this.$gridEl = $gridEl;

    this.setupGrid();

    // POJO:
    // this.filledPositions['24'] = TileObj
    this.filledPositions = {};

    // Spawns the first 2 tiles
    const t1 = this.spawnTile();
    window.t1 = t1;
    this.spawnTile();
  }

  setupGrid() {
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

    const $tileContainer = $("<div class='tile-container'>");
    $(".grid-container").append($tileContainer);
  }

  spawnTile() {
    const pos = this.randomPosition();
    const newTile = new Tile(pos);

    $(".tile-container").append(newTile.$html);

    this.filledPositions[pos] = newTile;
    // this.filledPositions[pos].newPosition = pos;

    return newTile;
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


  moveTiles(direction) {
    let row, col, pos;
    for (let cell = 0; cell < 16; cell++) {
      row = Math.floor(cell%4) + 1;
      col = Math.floor(cell/4) + 1;
      pos = this.posToString(row,col);
      console.log("checking @ ", pos);

      // If there's NO tile on pos, look for the next tile to move it into the empty pos
      if (!this.filledPositions[pos]) this.searchAndMove(row, col);

    }
    //direction can be "UP", "DOWN", "LEFT", "RIGHT"
  }


  searchAndMove(row, col) {
    let pos = this.posToString(row,col);
    // debugger
    for (let oldRow = row+1; oldRow < 5; oldRow++) {
      let oldPos = this.posToString(oldRow,col);
      if (this.filledPositions[oldPos]) {
        console.log("tile found at ", oldPos, this.filledPositions[oldPos]);
        this.filledPositions[pos] = this.filledPositions[oldPos];
        this.filledPositions[pos].setPosition(pos);
        this.filledPositions[oldPos] = false;
        return;
      }
    };
  }


}

export default Grid;
