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
      height = $('#field').height(),
      audio = $('audio')[0];

  for (var i = 1; i < 106; i++) {
    pos = randRange([0, Math.PI]);
    star = $('<div class="star"/>')
      .css({
        position: 'absolute',
        top: randRange([0, height]),
        left: randRange([0, 100]) + '%',
        transform: 'scale(' + randRange([0.9, 1.1]) + ')',
        opacity: 0
      })
      .appendTo('#field');

    star.pos = 0;
    stars[i] = star;
  }

  // 1-5 background
  stars[1].offset = 0;
  stars[2].offset = 0.05;
  stars[3].offset = 0.25;
  stars[4].offset = 0.5;
  stars[5].offset = 0.75;
  stars[6].offset = 0.875;

  // 6-11 bass notes
  stars[10].css('transform', 'scale(2)');
  stars[10].offset = 0;
  stars[11].css('transform', 'scale(2)');
  stars[11].offset = 3.5 / 16;
  stars[12].css('transform', 'scale(2)');
  stars[12].offset = 4.5 / 16;
  stars[13].css('transform', 'scale(2)');
  stars[13].offset = 8 / 16;
  stars[14].css('transform', 'scale(2)');
  stars[14].offset = 11.5 / 16;
  stars[15].css('transform', 'scale(2)');
  stars[15].offset = 13.5 / 16;

  // 100-102 chimes
  stars[100].offset = 0;
  stars[101].offset = 3.5 / 16;
  stars[102].offset = 8 / 16;

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
      count = 0,
      tempo = 1.26,
      measure = tempo * 8;

  function pulse() {
    var time = audio.currentTime,
        beat = (time % 1.26) / 1.26,
        beat2 = (time % measure) / measure,
        offset;

    testtime = time;

    for (var i = 1; i < 103; i++) {
      stars[i].pos -= 0.05;
      stars[i].css({opacity: stars[i].pos});
    }

    if (time < 165) {
    // background stars
    if (time < 40.3 || time > 50) {
      for (var i = 1; i < 7; i++) {
        star = stars[i];
        point = (beat - star.offset + 1) % 1;

        if (point > 0.95) {
          star.pos = (point - 0.95) / 0.05;
        }
        else if (point < 0.4 && star.pos > 0) {
          star.pos = (0.4 - point) / 0.4;
        }

        star.css({opacity: star.pos});
      }
    }

    // bass notes
    if (time > 10) {
      for (i = 10; i < 16; i++) {
        star = stars[i];
        point = (beat2 - star.offset + 1) % 1;

        if (point > 0.99) {
          star.pos = (point - 0.99) / 0.01;
        }
        else if (point < 0.4 && star.pos > 0) {
          star.pos = (0.4 - point) / 0.4;
        }

        star.css({opacity: star.pos});
      }
    }

    // rhythm
    if (time > 50.3 && time < 131) {
      for (i = 20; i < 60; i++) {
        star = stars[i];
        offset = Math.floor(i / 10) * 0.25;
        point = (beat - offset + 1) % 1;

        if (point > 0.95) {
          star.pos = (point - 0.95) * 20;
        }
        else if (point < 0.2 && star.pos > 0) {
          star.pos = (0.2 - point) / 0.2;
        }

        star.css({opacity: star.pos * 0.5});
      }
    }


    // chimes
    if (time > 50 && time < 70 || time > 91 && time < 110 || time > 131) {
      for (i = 100; i < 103; i++) {
        star = stars[i];
        point = (beat2 - star.offset + 1) % 1;

        if (point < 0.1) {
          star.css({
            top: 0 + point * 10000,
            left: 1000 - point * 10000 - star.offset * 1000,
            opacity: 1 - point * 10
          });
        }
      }
    }
    else if (time > 70 && time < 91 || time > 110 && time < 131) {
      for (i = 100; i < 102; i++) {
        star = stars[i];
        offset = (i % 100) / 2;
        point = (beat + offset) % 1;

        if (point < 0.5) {
          star.css({
            top: 0 + point * 1000,
            left: 1000 - point * 1000 - offset * 1000,
            opacity: 1 - point * 2
          });
        }
      }
    }

    }
    requestAnimationFrame(pulse);
  }

  pulse();
});

