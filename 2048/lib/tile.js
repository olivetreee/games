// Use ES5 here for practice
function Tile (value) {
  this.value = value;
  this.$html = $("<div></div>");
}

Tile.prototype.setPosition = function(row,col) {

}

module.exports = Tile;
