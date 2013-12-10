module.exports = ['$cookieStore', function($cookieStore) {
  'use strict';

  return {
    restrict: 'A',
    scope:{
      primary: '=?',
      alpha: '=?',
      accel: '=?',
      velocity: '=?',
      minDist: '=?',
      particles: '=?'
    },
    link:function(scope, element){

      var opts = {
        primary: '100,100,100',
        alpha: '.2',
        particles: 300,
        minDist: 60,
        velocity: 1,
        accel: (1/90000)
      };

      for(var opt in opts){
        if(opts.hasOwnProperty(opt)){
          if(scope.hasOwnProperty(opt))
            opts[opt] = scope[opt];
        }
      }
      var id = 'matrixOpts';
      var cachedOpts = $cookieStore.get(id) || {};
      opts = $.extend(opts, cachedOpts);
      $cookieStore.put(id, opts);

      var requestAnimFrame = (function(){
        return  window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
      })();

      var canvas = element.get(0),
        ctx = canvas.getContext('2d'),
        particles = [],

        particleCount = opts.particles,
        minDist = opts.minDist,
        velocity = opts.velocity,
        accel = opts.accel,
        primaryColor = opts.primary,
        primaryAlpha = opts.alpha;

      canvas.width = element.innerWidth();
      canvas.height = element.innerHeight();

      function paintCanvas() {
        canvas.width = element.innerWidth();
        canvas.height = element.innerHeight();
      }

      function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = Math.random()*-1 + Math.random() * velocity;
        this.vy = Math.random()*-1 + Math.random() * velocity;

        this.radius = 3;

        this.draw = function() {
          ctx.fillStyle = 'rgba(' + primaryColor + ',' + primaryAlpha + ')';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fill();
        };
      }

      for(var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      function draw() {
        paintCanvas();

        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];
          p.draw();
        }

        update();
      }

      function update() {

        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];

          p.x += p.vx;
          p.y += p.vy;

          if(p.x + p.radius > canvas.width)
            p.x = p.radius;

          else if(p.x - p.radius < 0) {
            p.x = canvas.width - p.radius;
          }

          if(p.y + p.radius > canvas.height)
            p.y = p.radius;

          else if(p.y - p.radius < 0) {
            p.y = canvas.height - p.radius;
          }

          for(var j = i + 1; j < particles.length; j++) {
            distance(p, particles[j]);
          }
        }
      }

      function distance(p1, p2) {
        var dist,
          dx = p1.x - p2.x,
          dy = p1.y - p2.y;

        dist = Math.sqrt(dx*dx + dy*dy);

        if(dist <= minDist) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(' + primaryColor + ','+ ((1.2-dist/minDist) * parseFloat(primaryAlpha)) +')';
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.closePath();

          var ax = dx*accel,
            ay = dy*accel;

          p1.vx -= ax;
          p1.vy -= ay;

          p2.vx += ax;
          p2.vy += ay;
        }
      }

      function animloop() {
        draw();
        requestAnimFrame(animloop);
      }

      animloop();
    }
  };

}];