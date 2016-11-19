import $ from "jquery";

class Background {

  constructor() {
  }

  spawnTile(val) {
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const tileLeft = Math.floor(Math.random() * windowWidth) - 100;
    const tileTop = Math.floor(Math.random() * windowHeight) - 100;
    const valClass = `val-${val}`;
    const randomBlur = `${Math.floor(Math.random() * 10) + 2}px`;
    let $tileHtml =
    $(`<div class='tile ${valClass}'>`).css("top", tileTop).css("left", tileLeft).css("filter", `blur(${randomBlur})`);
    $tileHtml.text(val);
    $("#background").append($tileHtml);
  }

  addTileToDom(tile) {

  }


}

export default Background;
