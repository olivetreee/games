// Use ES5 here for practice

import $ from "jquery";


function Tile (pos) {
  this.value = Math.round(Math.random()+1)*2;
  this.pos = pos;
  this.$html = $(`<div class='tile pos-${pos}'>${this.value}</div>`);
}

Tile.prototype.setPosition = function(newPos) {
  this.$html.removeClass(`pos-${this.pos}`).addClass(`pos-${newPos}`);
}

module.exports = Tile;
