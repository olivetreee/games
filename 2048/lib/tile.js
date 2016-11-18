// Use ES5 here for practice

import $ from "jquery";


function Tile (position, merged=false) {
  this.value = Math.round(Math.random()+1)*2;
  this.position = position;

  this.$html = $(`<div class='tile val-${this.value} pos-${position}'>${this.value}</div>`);
}

Tile.prototype.setPosition = function(newPos) {
  this.$html.removeClass(`pos-${this.position}`).addClass(`pos-${newPos}`);
  this.position = newPos;
}

Tile.prototype.doubleValue = function() {
  const val = this.value * 2;
  this.setValue(val);
  return val;
}

Tile.prototype.setValue = function(val) {
  this.$html.text(val);
  this.$html.removeClass(`val-${this.value}`).addClass(`val-${val}`);
  this.value = val;
}

Tile.prototype.removeSelf = function() {
  const htmlClass = `.pos-${this.position}`;
  debugger
  window.setTimeout(() => $(htmlClass).remove(), 200);
}

Tile.prototype.spawn = function() {
  // debugger
  const tileClass = `pos-${this.position}`;
  console.log(document.getElementsByClassName(tileClass));
  const tileEl = document.getElementsByClassName(tileClass)[0];

  tileEl.animate({
    opacity: [0,1],
  }, {
    // Apply effect during delay.
    fill: 'backwards',

    // Iterations last for 2000ms.
    duration: 300,

    // Play every second iteration backwards.
    direction: 'normal',

    // The timing function to use with each iteration.
    easing: 'linear'
  });

}

module.exports = Tile;
