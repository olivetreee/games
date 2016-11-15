import $ from "jquery";
import Game from "./game";
import Grid from "./grid";

$( () => {
  const gridEl = $("#game");
  const game = new Game();
  const grid = new Grid(game, gridEl);
  window.grid = grid;
});
