import $ from "jquery";
import Tile from "./tile";

class Grid {

  constructor($gridEl) {
    this.$gridEl = $gridEl;

    this.setupGrid();

    // POJO:
    // this.filledPositions['24'] = TileObj
    this.filledPositions = {};

    // To check if board is full
    this.tileCount = 0;

    // Spawns the first 2 tiles
    this.spawnTile();
    this.spawnTile();


    // TESTING
    // const t1 = this.spawnTile();
    // const t2 = this.spawnTile();

    // this.filledPositions[t1.pos] = false;
    // this.filledPositions[t2.pos] = false;
    // t1.setPosition('24');
    // t2.setPosition('34');
    // this.filledPositions["24"] = t1;
    // this.filledPositions["34"] = t2;
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

    this.filledPositions[pos] = newTile;

    this.tileCount++;

    // Wait for the move animation to finish to add the tile to the visual grid. It has to be after this.tileCount or the player might make a new move during the timeout period, resulting in a crash.
    window.setTimeout(() => {
      $(".tile-container").append(newTile.$html);
    }, 200);

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


  moveTiles(key) {
    //direction can be "UP", "DOWN", "LEFT", "RIGHT"
    const {increment, startAt, direction} = this.defineSearchParams(key);

    let row, col, pos;
    for (let cell = 0; cell < 16 ; cell++) {
      // The way we run through the cells depends on startAt and increment on the following way:
      // rowNum = startAt + (increment * (cell%4))

      if (direction === "V") {
        row = startAt + (increment * (cell%4));
        col = Math.floor(cell/4) + 1;
      } else {
        col = startAt + (increment * (cell%4));
        row = Math.floor(cell/4) + 1;
      };

      pos = this.posToString(row,col);

      // If there's NO tile on pos, look for the next tile to move it into the empty pos
      if (!this.filledPositions[pos]) this.searchAndMove(row, col, increment, direction);
    }

    this.spawnTile()

  }

  defineSearchParams(key) {
    let params = {};
    switch (key) {
      case "UP":
        params.increment = 1;
        params.startAt = 1;
        params.direction = "V";
        break;
      case "DOWN":
        params.increment = -1;
        params.startAt = 4;
        params.direction = "V";
        break;
      case "LEFT":
        params.increment = 1;
        params.startAt = 1;
        params.direction = "H";
        break;
      case "RIGHT":
        params.increment = -1;
        params.startAt = 4;
        params.direction = "H";
        break;
      default:
        console.log("Invalid direction param");
    }

    return params;
  }


  searchAndMove(row, col, increment, direction) {
    let emptyPos = this.posToString(row,col);
    // debugger

    if (direction === "V") {
      let oldRow = row+increment;
      while ( oldRow > 0 && oldRow < 5) {
        let oldPos = this.posToString(oldRow,col);
        if (this.filledPositions[oldPos]) {
          this.filledPositions[emptyPos] = this.filledPositions[oldPos];
          this.filledPositions[emptyPos].setPosition(emptyPos);
          this.filledPositions[oldPos] = false;
          return;
        }
        oldRow+= increment;
      }
    } else {
      let oldCol = col+increment;
      while ( oldCol > 0 && oldCol < 5) {
        let oldPos = this.posToString(row, oldCol);
        if (this.filledPositions[oldPos]) {
          this.filledPositions[emptyPos] = this.filledPositions[oldPos];
          this.filledPositions[emptyPos].setPosition(emptyPos);
          this.filledPositions[oldPos] = false;
          return;
        }
        oldCol+= increment;
      }
    }

  }

  isGridFull() {
    return (this.tileCount === 16);
  }


}

export default Grid;
