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
    this.animateSpawn($tileHtml[0]);
  }

  animateSpawn(tile) {
    console.log(tile);
    tile.animate({
      transform: ['scale(0,0)', 'scale(1,1)'],
    }, {
      // Apply effect during delay. Avoids flashing effect.
      fill: 'backwards',

      // Wait some time while move happens
      delay: 100,

      // Iterations last for 2000ms.
      duration: 200,

      // The timing function to use with each iteration.
      easing: 'linear'
    });


  }


}

export default Background;
