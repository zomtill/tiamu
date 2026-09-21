window.addEventListener('DOMContentLoaded', function () {

  var doc = document,
    flower = doc.querySelector('.flower'),
    petalPartMarkup = '<div class="box"><div class="shape"></div></div>',
    maxParts = 20,
    maxPetals = 6,
    partsFontStep = 25 / maxParts;

  createFlower();

  function createFlower() {

    var angle = 360 / maxPetals;

    for (var i = 0; i < maxPetals; i++) {

      var petal = createPetal(),
        currAngle = angle * i + 'deg',
        transform =
          'transform: rotateY(' +
          currAngle +
          ') rotateX(-30deg) translateZ(9vmin)';

      petal.setAttribute('style', transform);
      flower.appendChild(petal);
    }
  }

  function createPetal() {

    var box = createBox(null, 0),
      petal = doc.createElement('div');

    petal.classList.add('petal');

    for (var i = 1; i <= maxParts; i++) {
      box = createBox(box, i);
    }

    petal.appendChild(box);

    return petal;
  }

  function createBox(box, pos) {

    var fontSize =
      partsFontStep * (maxParts - pos) + 'vmin';

    var half = maxParts / 2;

    if (pos < half + 1) {
      fontSize = partsFontStep * pos + 'vmin';
    }

    var colors = [
      '#FFF9A6',
      '#FFF176',
      '#FFE45C',
      '#FFD83D',
      '#F9C92E',
      '#E9B82C',
      '#D9A928'
    ];

    var color =
      colors[
      Math.max(
        0,
        Math.min(
          Math.floor(pos / 3),
          colors.length - 1
        )
      )
      ];

    var newShape = doc.createElement('div');

    newShape.classList.add('shape');

    var newBox = doc.createElement('div');

    newBox.classList.add('box');

    newBox.setAttribute(
      'style',
      'color: ' + color + ';font-size: ' + fontSize
    );

    if (box) {
      newBox.appendChild(box);
    }

    newBox.appendChild(newShape);

    return newBox;
  }


  /* =========================
     ELEMENTOS PRINCIPALES
     ========================= */

  var mainContent =
    document.getElementById('main-content');

  if (mainContent) {
    mainContent.style.display = '';
  }

  var startBtn =
    document.getElementById('start-btn');

  var btnText =
    'click ( •̀ ω •́ )';

  startBtn.innerHTML =
    '<img src="img/till.png" alt="" class="button-icon"><span></span>';

  startBtn.disabled = true;

  let iBtn = 0;

  var btnTextElement =
    startBtn.querySelector('span');


  /* =========================
     TEXTO DEL BOTÓN
     ========================= */

  function typeBtn() {

    if (iBtn < btnText.length) {

      btnTextElement.textContent +=
        btnText.charAt(iBtn);

      iBtn++;

      setTimeout(typeBtn, 90);

    } else {

      startBtn.disabled = false;
    }
  }

  typeBtn();


  /* =========================
     MENSAJES
     ========================= */

  const messages = [
    'hola dan',
    'te odio j0t0',
    '♡'
  ];

  const subtitle =
    'ola mi amor te amo mucho una florsita'
  var wrapper =
    document.querySelector('.wrapper');

  var msg =
    document.querySelector('.flower-message');


  /* =========================
     CENTRAR BOTÓN
     ========================= */

  var container =
    document.getElementById('start-btn-container');

  container.style.position = 'fixed';
  container.style.top = '50%';
  container.style.left = '50%';
  container.style.transform =
    'translate(-50%,-50%)';

  container.style.zIndex = '100';


  /* =========================
     BOTÓN PRINCIPAL
     ========================= */

  startBtn.addEventListener('click', function () {

    var isMobile =
      window.innerWidth <= 600;

    container.style.display = 'none';

    wrapper.style.display = '';


    /* =========================
       MÚSICA
       ========================= */

    var music =
      document.getElementById('bg-music');

    if (music) {

      music.currentTime = 0;

      var playPromise =
        music.play();

      if (playPromise !== undefined) {

        playPromise.catch(function (error) {

          alert(
            'No se pudo reproducir la música. Verifica el archivo o permisos del navegador.'
          );

        });
      }
    }


    /* =========================
       GALAXIA / PARTÍCULAS
       ========================= */

    setTimeout(function () {

      var galaxyCanvas =
        document.getElementById('galaxy-canvas');

      galaxyCanvas.style.display = '';

      galaxyCanvas.width =
        window.innerWidth;

      galaxyCanvas.height =
        window.innerHeight;

      var ctx =
        galaxyCanvas.getContext('2d');

      var numDots =
        isMobile ? 3 : 60;

      var dots = [];

      var dotsToAdd = 0;

      var minDotSize =
        isMobile ? 0.5 : 0.7;

      var maxDotSize =
        isMobile ? 1.1 : 1.7;


      /* =========================
         AUDIO
         ========================= */

      var audio =
        document.getElementById('bg-music');

      var audioCtx,
        analyser,
        dataArray;

      if (window.AudioContext && audio) {

        audioCtx =
          new (window.AudioContext ||
            window.webkitAudioContext)();

        var source =
          audioCtx.createMediaElementSource(audio);

        analyser =
          audioCtx.createAnalyser();

        source.connect(analyser);

        analyser.connect(
          audioCtx.destination
        );

        analyser.fftSize = 64;

        dataArray =
          new Uint8Array(
            analyser.frequencyBinCount
          );
      }


      /* =========================
         CREAR PARTÍCULAS
         ========================= */

      function addDot() {

        if (dotsToAdd < numDots) {

          let angle =
            Math.random() * 2 * Math.PI;

          let radius =
            Math.random() *
            (galaxyCanvas.width / 2.2);

          let x =
            galaxyCanvas.width / 2 +
            Math.cos(angle) * radius;

          let y =
            galaxyCanvas.height / 2 +
            Math.sin(angle) * radius;

          let speed =
            0.2 +
            Math.random() * 0.7;

          let dir =
            Math.random() * 2 * Math.PI;

          let dotSize =
            minDotSize +
            Math.random() *
            (maxDotSize - minDotSize);

          dots.push({
            x: x,
            y: y,
            r: dotSize,
            dx: Math.cos(dir) * speed,
            dy: Math.sin(dir) * speed,
            alpha:
              0.45 +
              Math.random() * 0.4
          });

          dotsToAdd++;

          setTimeout(addDot, 10);
        }
      }

      addDot();


      /* =========================
         ANIMACIÓN DE PARTÍCULAS
         ========================= */

      function animateGalaxy() {

        ctx.clearRect(
          0,
          0,
          galaxyCanvas.width,
          galaxyCanvas.height
        );

        let particleColor =
          '#3f3e4c';

        let speedFactor = 1;

        if (analyser && dataArray) {

          analyser.getByteFrequencyData(
            dataArray
          );

          let avg =
            dataArray.reduce(
              (a, b) => a + b,
              0
            ) /
            dataArray.length;

          speedFactor =
            0.7 +
            (avg / 255) * 2.5;
        }


        for (let dot of dots) {

          ctx.save();

          ctx.translate(
            dot.x,
            dot.y
          );

          ctx.scale(
            dot.r / 2,
            dot.r / 2
          );

          ctx.beginPath();

          ctx.moveTo(0, 3);

          ctx.bezierCurveTo(
            -10, -5,
            -10, -12,
            -5, -12
          );

          ctx.bezierCurveTo(
            -2, -12,
            0, -9,
            0, -6
          );

          ctx.bezierCurveTo(
            0, -9,
            2, -12,
            5, -12
          );

          ctx.bezierCurveTo(
            10, -12,
            10, -5,
            0, 3
          );

          ctx.closePath();

          ctx.fillStyle =
            particleColor;

          ctx.globalAlpha =
            dot.alpha;

          ctx.shadowColor =
            particleColor;

          ctx.shadowBlur = 1;

          ctx.fill();

          ctx.restore();


          dot.x +=
            dot.dx * speedFactor;

          dot.y +=
            dot.dy * speedFactor;


          if (dot.x < 0) {
            dot.x =
              galaxyCanvas.width;
          }

          if (dot.x > galaxyCanvas.width) {
            dot.x = 0;
          }

          if (dot.y < 0) {
            dot.y =
              galaxyCanvas.height;
          }

          if (dot.y > galaxyCanvas.height) {
            dot.y = 0;
          }
        }

        requestAnimationFrame(
          animateGalaxy
        );
      }


      /* =========================
         MOSTRAR GALAXIA
         ========================= */

      setTimeout(function () {

        galaxyCanvas.style.opacity = '1';

      }, 50);


      /* =========================
         ANIMACIÓN DEL CORAZÓN
         ========================= */

      function animateHeart() {

        var heartCenterX =
          galaxyCanvas.width / 2;

        var heartCenterY =
          msg.getBoundingClientRect().bottom -
          galaxyCanvas.getBoundingClientRect().top +
          80;

        var heartSize =
          Math.min(
            galaxyCanvas.width,
            galaxyCanvas.height
          ) / 7;

        var heartPositions = [];


        for (
          let i = 0;
          i < dots.length;
          i++
        ) {

          let t =
            Math.PI *
            2 *
            (i / dots.length);

          let x =
            heartCenterX +
            heartSize *
            16 *
            Math.pow(
              Math.sin(t),
              3
            );

          let y =
            heartCenterY -
            heartSize *
            (
              13 * Math.cos(t) -
              5 * Math.cos(2 * t) -
              2 * Math.cos(3 * t) -
              Math.cos(4 * t)
            );

          heartPositions.push({
            x: x,
            y: y
          });
        }


        var steps = 14;

        var step = 0;


        function moveDotsToHeart() {

          for (
            let i = 0;
            i < dots.length;
            i++
          ) {

            var dot =
              dots[i];

            var target =
              heartPositions[i];

            dot.x +=
              (target.x - dot.x) /
              (steps - step + 1);

            dot.y +=
              (target.y - dot.y) /
              (steps - step + 1);
          }

          step++;

          if (step < steps) {

            requestAnimationFrame(
              moveDotsToHeart
            );
          }
        }

        moveDotsToHeart();
      }


      /* =========================
         TEXTO
         ========================= */

      msg.style.display = 'block';
      msg.style.opacity = '1';

      let current = 0;


      function typeText(text, cb) {

        msg.textContent = '';

        let i = 0;


        function type() {

          if (i < text.length) {

            msg.textContent +=
              text.charAt(i);

            i++;

            setTimeout(
              type,
              90
            );

          } else if (cb) {

            setTimeout(
              cb,
              1000
            );
          }
        }

        type();
      }


      function showNext() {

        if (current < messages.length) {


          /* =========================
             TERCER MENSAJE
             ========================= */

          if (current === 2) {

            msg.innerHTML = `
  <div class="message-container">
    <div class="title-text"></div>
    <div class="subtitle-text"></div>
    <img
      src="img/gay.png"
      class="message-image"
    >
  </div>
`;

            var titleElement =
              msg.querySelector(
                '.title-text'
              );

            var subtitleElement =
              msg.querySelector(
                '.subtitle-text'
              );


            let i = 0;


            function typeTitle() {

              if (
                i <
                messages[current].length
              ) {

                titleElement.textContent +=
                  messages[current].charAt(i);

                i++;

                setTimeout(
                  typeTitle,
                  90
                );

              } else {

                subtitleElement.textContent =
                  subtitle;


                setTimeout(
                  function () {

                    animateHeart();

                  },
                  1000
                );
              }
            }


            typeTitle();


          } else {


            /* =========================
               PRIMER Y SEGUNDO MENSAJE
               ========================= */

            typeText(
              messages[current],
              function () {

                current++;

                showNext();

              }
            );
          }
        }
      }


      /* =========================
         INICIAR SECUENCIA
         ========================= */

      showNext();


      /*
       * Si quieres que las partículas
       * se muevan, descomenta esta línea:
       *
       * animateGalaxy();
       *
       * Actualmente está apagada.
       */

      // animateGalaxy();

    }, 2000);

  });

});