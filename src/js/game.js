(function() {
  'use strict';

  function Game() {
    this.bg = null;
    this.player = null;
    this.filter = null;
    this.escKey = null;
    this.fullScreen = false;
  }

  Game.prototype = {

    create: function() {
      var x = this.game.width / 2,
        y = this.game.height / 2;
      this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

      this.bg = this.add.sprite(0, 0, null);
      this.bg.width = this.game.width;
      this.bg.height = this.game.height;

      this.filter = this.add.filter('LightBeam', this.game.width, this.game.height);
      this.filter.alpha = 0.0;

      this.bg.filters = [this.filter];

      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.input.onDown.add(this.onInputDown, this);

      this.escKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
      this.escKey.onDown.add(this.toggleFullscreen, this, 0);
    },

    update: function() {
      var x, y, cx, cy, dx, dy, angle, scale;
      this.filter.update();

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