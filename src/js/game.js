(function() {
  'use strict';

  function Game() {
    this.bg = null;
    this.player = null;
    this.filter = null;
    this.filterList = [];
    this.fKey = null;
    this.spaceKey = null;
    this.fullScreen = false;
    this.helpText = null;
    this.minigun = null;
    this.bullets = null;
    this.bulletTime = 0;
  }

  Game.prototype = {
    createHelpText: function(text) {
      var t = this.add.text(this.game.width, this.game.height, text);
      t.anchor.setTo(1);
      var grd = t.context.createLinearGradient(0, 0, 0, t.canvas.height);
      grd.addColorStop(0, '#8ED6FF');
      grd.addColorStop(1, '#004CB3');
      t.fill = grd;

      t.stroke = '#000000';
      t.strokeThickness = 1;
      t.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
      return t;
    },
    loadFilters: function() {
      var f = this.add.filter('LightBeam', this.game.width, this.game.height);
      f.alpha = 0.0;
      this.filterList.push(f);
      f = this.add.filter('LazerBeam', this.game.width, this.game.height, 0.2);
      f.alpha = 0.0;
      this.filterList.push(f);
      f = this.add.filter('ColorBars', this.game.width, this.game.height);
      f.alpha = 0.0;
      this.filterList.push(f);
    },
    create: function() {
      var x = this.game.width / 2,
        y = this.game.height / 2;
      this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

      this.bg = this.add.sprite(0, 0, null);
      this.bg.width = this.game.width;
      this.bg.height = this.game.height;

      this.loadFilters();
      this.filter = this.filterList.shift();

      this.bg.filters = [this.filter];

      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.player.enableBody = true;
      this.player.physicsBodyType = Phaser.Physics.ARCADE;
      this.physics.enable(this.player, Phaser.Physics.ARCADE);


      this.input.onDown.add(this.onInputDown, this);
      this.fKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
      this.fKey.onDown.add(this.toggleFullscreen, this, 0);

      this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.spaceKey.onDown.add(this.switchFilter, this, 0);

      this.helpText = this.createHelpText('Presione F para pantalla completa.');

      this.minigun = this.add.sprite(0, this.game.height / 2, 'minigun');
      this.minigun.anchor.setTo(0, 0.5);
      this.physics.enable(this.minigun, Phaser.Physics.ARCADE);

      this.bullets = this.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      for (var i = 0; i < 20; i++) {
        var b = this.bullets.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(this.resetBullet, this);
      }
    },
    resetBullet: function(bullet) {
      bullet.kill();
    },
    updateMinigun: function() {
      this.minigun.body.velocity.x = 0;
      this.minigun.body.velocity.y = 0;
      this.minigun.body.angularVelocity = 0;
      if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.minigun.body.angularVelocity = -200;
      } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.minigun.body.angularVelocity = 200;
      }
      if (this.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        this.fireBullet();
      }

    },
    fireBullet: function() {
      if (this.time.now > this.bulletTime) {
        var bullet = this.bullets.getFirstExists(false);
        var posB = this.minigun.toGlobal(new PIXI.Point(this.minigun.width, 0));
        if (bullet) {
          bullet.reset(posB.x, posB.y);
          bullet.anchor.setTo(0, 0.5);
          bullet.rotation = this.minigun.rotation;
          //bullet.body.velocity.x = 300;
          this.physics.arcade.velocityFromRotation(bullet.rotation, 120, bullet.body.velocity);
          this.bulletTime = this.time.now + 150;
        }
      }
    },
    switchFilter: function() {
      this.filterList.push(this.filter);
      this.filter = this.filterList.shift();
      this.bg.filters.pop();
      this.bg.filters.push(this.filter);
    },

    update: function() {
      var x, y, cx, cy, dx, dy, angle, scale;
      this.filter.update();
      this.updateMinigun();
      this.physics.arcade.overlap( this.player, this.bullets, function( player, bullet) {
        var ex = bullet.game.add.sprite(bullet.x, bullet.y, 'explosion');
        ex.anchor.setTo(0.5);
        var boomAnimacion = ex.animations.add('boom');
        boomAnimacion.onComplete.add( function() {
          boomAnimacion.destroy();
          ex.kill();
        });
        boomAnimacion.play( 30, false);
        bullet.kill();
      });
      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;

      angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      this.player.angle = angle;

      dx = x - cx;
      dy = y - cy;
      scale = Math.sqrt(dx * dx + dy * dy) / 100;

      this.player.scale.x = scale * 0.6;
      this.player.scale.y = scale * 0.6;


    },
    toggleFullscreen: function() {
      this.scale.startFullScreen();
    },
    onInputDown: function() {
      this.game.state.start('menu');
    }

  };

  window['phaser-test2'] = window['phaser-test2'] || {};
  window['phaser-test2'].Game = Game;

}());