(function () {
	"use strict";

	xtpl.ctrl('main', function (ctx) {
		var hole = wormhole();

		ctx.holes = 0;
		ctx.images = [1, 2, 3, 4, 5];
		ctx.imageNum = ctx.images[Math.random() * ctx.images.length | 0];


		//console.log('hole:', hole.id);
		//
		//hole.on('master', function () {
		//	console.log('I master');
		//});


		hole.on('choose', function (num) {
			ctx.$set('imageNum', num);
		});


		hole.on('peers', function (peers) {
			if (hole.master) {
				hole.emit('choose', ctx.imageNum);
			}

			ctx.$set('holes', peers.length);
		});


		ctx.choose = function (num) {
			hole.emit('choose', num);
		};


		ctx.images.forEach(function (num) {
			(new Image).src = './st/image-' + num + '.png';
		});
	});
})();
