// Use ES5 here for practice

import $ from "jquery";


function Tile (position, merged=false) {
  this.value = Math.round(Math.random()+1)*2;
  this.position = position;

  if (merged) {
    this.$html = $(`<div class='tile pos-${position} merged'>${this.value}</div>`);
  } else {
    this.$html = $(`<div class='tile pos-${position}'>${this.value}</div>`);
  }
}

Tile.prototype.setPosition = function(newPos) {
  this.$html.removeClass(`pos-${this.position}`).addClass(`pos-${newPos}`);
  this.position = newPos;
}

Tile.prototype.doubleValue = function() {
  this.value *= 2;
  this.$html.text(this.value);
}

Tile.prototype.setValue = function(val) {
  this.value = val;
  this.$html.text(val);
}

Tile.prototype.removeSelf = function() {
  const htmlClass = `.pos-${this.position}`;
  debugger
  window.setTimeout(() => $(htmlClass).remove(), 200);

}

module.exports = Tile;
