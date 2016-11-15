import $ from "jquery";
import Game from "./game";
import Grid from "./grid";

$( () => {
  const $gridEl = $("#game");
  const grid = new Grid($gridEl);
  const game = new Game(grid);
  window.game = game;
});
