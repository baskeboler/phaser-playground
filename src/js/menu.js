(function() {
  'use strict';

  function Menu() {
    this.bgSprite = null;
    this.menuMusic = null;
    this.tunnelFilter = null;
  }

  Menu.prototype = {

    create: function() {
      this.bgSprite = this.add.sprite(0, 0, 'cobbletexture');
      this.bgSprite.width = this.game.width;
      this.bgSprite.height = this.game.height;

      this.tunnelFilter = this.add.filter('Tunnel', this.game.width, this.game.height, this.bgSprite.texture);
      this.tunnelFilter.origin = 1.0;
      this.bgSprite.filters = [this.tunnelFilter];

      this.menuText = new MenuText(this.game);
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