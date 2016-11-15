import $ from "jquery";
import Tile from "./tile";

class Grid {

  constructor(game, $gridEl) {
    this.game = game;
    this.$gridEl = $gridEl;

    this.setupGrid();

    // POJO with wither undefined, false or a tile object
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
        this.filledPositions[this.posToString(row,cell)] = {};
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

    this.filledPositions[pos].tile = newTile;
    this.filledPositions[pos].newPosition = pos;

    return newTile;
  }

  moveTiles(direction) {
    //direction can be "UP", "DOWN", "LEFT", "RIGHT"
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
    return this.filledPositions[this.posToString(r,c)].tile;
  }

  posToString(r,c) {
    return `${r}${c}`;
  }


}

export default Grid;
