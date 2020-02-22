$(function () {
  function rand(from, to) {
    if (to == undefined) {
      to = from;
      to = 0;
    }

    return Math.random() * (to - from) + from;
  }

  function randRange(range) {
    return rand(range[0], range[1]);
  }

  var stars = [],
      star,
      pos,
      height = $('#field').height();

  for (var i = 1; i < 102; i++) {
    pos = randRange([0, Math.PI]);
    star = $('<div class="star"/>')
      .css({
        position: 'absolute',
        top: randRange([0, height]),
        left: randRange([0, 100]) + '%',
        transform: 'scale(' + randRange([0.9, 1.1]) + ')',
        opacity: Math.sin(pos)
      })
      .appendTo('#field');

    star.pos = pos;
    stars[i] = star;
  }

  if (!window.requestAnimationFrame) {
    if (window.webkitRequestAnimationFrame) {
      window.requestAnimationFrame = webkitRequestAnimationFrame;
    }
    else if (window.mozRequestAnimationFrame) {
      window.requestAnimationFrame = mozRequestAnimationFrame;
    }
    else {
      window.requestAnimationFrame = function (func) {
        return setTimeout(func, 20);
      }
    }
  }

  var boing = false,
      count = 0;

  function pulse() {
    if (boing) {
      boing = false;
      requestAnimationFrame(pulse);
      return;
    }

    boing = true;

    for (var i = 1; i < 100; i++) {
      star = stars[i];
      star.pos += 0.05;
      star.css({
        opacity: Math.abs(Math.sin(star.pos))
      });
    }

    var time = $.now(),
        shootTime = time % 5000;

    if (shootTime < 1000) {
      stars[100].css({
        top: 0 + shootTime,
        left: 1000 - shootTime,
        opacity: (1000 - shootTime) / 1000
      });
    }

    shootTime = time % 4000;
    if (shootTime < 800)  {
      stars[101].css({
        top: 20 + shootTime,
        left: 800 - shootTime,
        opacity: (800 - shootTime) / 800
      });
    }

    requestAnimationFrame(pulse);
  }

  pulse();
});

