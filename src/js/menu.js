(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
    this.bgSprite = null;
    this.menuMusic = null;
    this.tunnelFilter = null;
  }

  Menu.prototype = {

    create: function() {
      var x = this.game.width / 2,
        y = this.game.height / 2;
      this.bgSprite = this.add.sprite(0, 0, 'cobbletexture');
      this.bgSprite.width = this.game.width;
      this.bgSprite.height = this.game.height;

      this.tunnelFilter = this.add.filter('Tunnel', this.game.width, this.game.height, this.bgSprite.texture);
      this.tunnelFilter.origin = 1.0;
      this.bgSprite.filters = [this.tunnelFilter];

      this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Jueguito de mierda de victor');
      this.titleTxt.align = 'center';
      this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'START');
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

      this.input.onDown.add(this.onDown, this);

      this.menuMusic = this.add.audio('kiss');
      this.menuMusic.play();
    },

    update: function() {
      this.tunnelFilter.update();
      this.tunnelFilter.origin += 0.001;
    },

    onDown: function() {
      this.menuMusic.stop();
      this.game.state.start('game');
    }
  };

  window['phaser-test2'] = window['phaser-test2'] || {};
  window['phaser-test2'].Menu = Menu;

}());