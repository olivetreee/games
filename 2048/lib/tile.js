// Use ES5 here for practice

import $ from "jquery";


function Tile (position, merged=false) {
  this.value = Math.round(Math.random()+1)*2;
  this.position = position;

  this.$html = ""
  this.$outerHtml = $(`<div class='tile-wrapper pos-${position}'></div>`);
  this.$innerHtml = $(`<div class='tile val-${this.value}'>${this.value}</div>`);
  this.mountHtml();

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
  this.$innerHtml.text(val);
  this.$innerHtml.removeClass(`val-${this.value}`).addClass(`val-${val}`);
  this.mountHtml();
  this.value = val;
}

Tile.prototype.removeSelf = function() {
  const htmlClass = `.pos-${this.position}`;
  debugger
  window.setTimeout(() => $(htmlClass).remove(), 200);
}

Tile.prototype.mountHtml = function() {
  this.$html = this.$outerHtml.html(this.$innerHtml);
}

Tile.prototype.spawn = function() {
  // debugger
  const tileClass = `.pos-${this.position}`;
  const tileEl = document.querySelector(`${tileClass} .tile`);
  console.log(tileEl);

  tileEl.animate({
    transform: ['scale(0,0)', 'scale(1,1)'],
  }, {
    // Apply effect during delay.
    fill: 'backwards',

    // Wait some time while move happens
    delay: 100,

    // Iterations last for 2000ms.
    duration: 200,

    // Play every second iteration backwards.
    direction: 'normal',

    // The timing function to use with each iteration.
    easing: 'linear'
  });

}

module.exports = Tile;
