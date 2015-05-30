(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function() {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);

      this.loadResources();
    },

    loadResources: function() {
      this.load.image('player', 'assets/player.png');
      this.load.image('cobbletexture', 'assets/cobbletexture.png');
      this.load.image('minigun', 'assets/minigun.png');
      this.load.image('bullet', 'assets/bullet.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      this.load.spritesheet('explosion', 'assets/explosion.png', 128, 128, 49);

      this.load.script('marble', 'assets/filters/Tunnel.js');
      this.load.script('lightbeam', 'assets/filters/LightBeam.js');
      this.load.script('lazerbeam', 'assets/filters/LazerBeam.js');
      this.load.script('colorbars', 'assets/filters/ColorBars.js');
      this.load.script('checker', 'assets/filters/CheckerWave.js');
      this.load.script('fire', 'assets/filters/Fire.js');
      this.load.audio('kiss', 'assets/kiss.mp3', true);
      this.load.audio('rod', 'assets/rod.mp3', true);
      this.load.audio('audio-explosion', 'assets/explosion.mp3', true);
      this.load.audio('audio-laser', 'assets/laser.mp3', true);
    },

    create: function() {
      this.asset.cropEnabled = false;
    },

    update: function() {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function() {
      this.ready = true;
    }
  };

  window['phaser-test2'] = window['phaser-test2'] || {};
  window['phaser-test2'].Preloader = Preloader;

}());