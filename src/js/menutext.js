function MenuText(game) {
	// body...
	this.titleTxt = null;
	this.startTxt = null;
	this.game = game;
	this.create();
}

MenuText.prototype = {
	create: function() {
		var game = this.game;
		var x = game.width / 2,
			y = game.height / 2;

		this.titleTxt = game.add.bitmapText(x, y, 'minecraftia', 'Jueguito de mierda de victor');
		this.titleTxt.align = 'center';
		this.titleTxt.x = game.width / 2;
		this.titleTxt.anchor.setTo(0.5, 0.5);

		y += this.titleTxt.height + 5;
		this.startTxt = game.add.bitmapText(x, y, 'minecraftia', 'START');
		this.startTxt.align = 'center';
		this.startTxt.anchor.set(0.5);
		this.startTxt.x = game.width / 2;
		this.startTxt.tint = 0x15E0FF;
		var t1 = game.add.tween(this.titleTxt)
			.to({
				rotation: '-0.1'
			}, 500, 'Linear')
			.to({
				rotation: '+0.2'
			}, 1000, 'Linear')
			.to({
				rotation: '-0.1'
			}, 500, 'Linear')
			.loop();

		//from({rotation: -0.1}, 500, undefined, false,0, false, true);
		var t3 = game.add.tween(this.titleTxt)
			.to({
				y: '-50'
			}, 1000, 'Quad')
			.to({
				y: '+50'
			}, 1000, 'Quad')
			.loop();
		var t2 = game.add.tween(this.startTxt.scale).from({
			x: 3
		}, 1500, 'Bounce', false, 0, false, true);
		t1.start();
		t2.start();
		t3.start();
	},
	update: function() {},
	destroy: function() {}
}