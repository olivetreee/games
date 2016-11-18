import $ from "jquery";
import Tile from "./tile";
import { keys, findKey } from "lodash";

class Grid {

  constructor($gridEl) {
    this.$gridEl = $gridEl;

    this.newGrid();
    this.setupGrid();

    // TESTING
    // const t1 = this.spawnTile();
    // const t2 = this.spawnTile();
    // const t3 = this.spawnTile();
    //
    // window.t1 = t1;
    // window.t2 = t2;
    // window.t3 = t2;
    //
    // this.filledPositions[t1.position] = false;
    // this.filledPositions[t2.position] = false;
    // this.filledPositions[t3.position] = false;
    // t1.setPosition('11');
    // t1.setValue(2);
    // t2.setPosition('13');
    // t2.setValue(2);
    // t3.setPosition('14');
    // t3.setValue(4);
    // this.filledPositions["11"] = t1;
    // this.filledPositions["13"] = t2;
    // this.filledPositions["14"] = t3;
  }

  newGrid() {
    // POJO:
    // this.filledPositions['24'] = TileObj
    this.filledPositions = {};
    this.mergedTiles = {};
    this.roundPoints = 0;

    // To check if board is full
    this.tileCount = 0;

    // Spawns the first 2 tiles
    this.spawnTile();
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

  removeMerged() {
    this.mergedTiles = {};

    // Remove from the DOM
    $(".merged").remove();
  }

  searchTilesToMerge(key) {
    const {increment, startAt, direction} = this.defineLoopParams(key);
// Loop through filledPositions. If a tile exists:
//  • find the next tile on the same row or col, depending on the direction
//    • nextPos = direction === "V" ? increment * 10 : increment
//    • look for filledPositions[nextPos]. If it exists, return (should stop after finding the first tile), check the value and merge if possible.
//    • should stop incrementing if reached end of board or if found a filledPosition

    let nextTile;
    // keys(this.filledPositions).forEach ( pos => {
      // debugger
      // let intPos = parseInt(pos);
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


      let cellContent = this.filledPositions[pos];
      if (cellContent) {
        nextTile = this.findNextTile(pos, increment, direction);
        // debugger
        if (nextTile && nextTile.value === cellContent.value) {
          this.mergeTiles(cellContent, nextTile);
        }
      }
    }
    // })
  }

  findNextTile(pos, increment, direction) {
    const [row, col] = pos.split("").map( coord => parseInt(coord));

    if (direction === "V") {
      let nextRow = row+increment;
      while ( nextRow > 0 && nextRow < 5) {
        let nextPos = this.posToString(nextRow,col);
        let tile = this.filledPositions[nextPos];
        if (this.filledPositions[nextPos]) return tile;
        nextRow+= increment;
      }
    } else {
      let nextCol = col+increment;
      while ( nextCol > 0 && nextCol < 5) {
        let nextPos = this.posToString(row, nextCol);
        let tile = this.filledPositions[nextPos];
        if (this.filledPositions[nextPos]) return tile;
        nextCol+= increment;
      }
    }
    return false;
  }

  mergeTiles(tileA, tileB) {

    // Update tileA
    const posA = tileA.position;
    this.roundPoints += tileA.doubleValue();
    this.filledPositions[posA] = tileA;

    //Mark tile B to remove
    const posB = tileB.position;
    tileB.$html.addClass("merged");
    this.filledPositions[posB] = false;
    this.mergedTiles[posA] = tileB;

    this.tileCount--;
  }




  moveTiles(key) {
    //direction can be "UP", "DOWN", "LEFT", "RIGHT"
    const {increment, startAt, direction} = this.defineLoopParams(key);

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

  }

  defineLoopParams(key) {
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
          // this.filledPositions[emptyPos].setPosition(emptyPos);
          this.filledPositions[oldPos] = false;

          this.mergedTiles[emptyPos] = this.mergedTiles[oldPos];
          this.mergedTiles[oldPos] = false;
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
          // this.filledPositions[emptyPos].setPosition(emptyPos);
          this.filledPositions[oldPos] = false;

          this.mergedTiles[emptyPos] = this.mergedTiles[oldPos];
          this.mergedTiles[oldPos] = false;

          return;
        }
        oldCol+= increment;
      }
    }

  }

  isGridFull() {
    return (this.tileCount === 16);
  }

  isBeatingScore(score) {
    return findKey(this.filledPositions, ['value', score])
  }

  renderDom() {
    keys(this.filledPositions).forEach( pos => {
      let tile = this.filledPositions[pos];
      if (tile) tile.setPosition(pos);
    });

    keys(this.mergedTiles).forEach( pos => {
      let tile = this.mergedTiles[pos];
      if (tile) tile.setPosition(pos);
    });
  }


}

export default Grid;
