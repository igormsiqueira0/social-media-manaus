const Jimp = require('jimp'),
	fs = require('fs');

const images = fs.readdirSync('./assets/palestrantes/');

images.forEach((file) => {
	Jimp.read('assets/palestrantes/' + file)
		.then((img) => {
			img.cover(280, 280).write('assets/palestrantes/cropped/' + file);
		})
		.catch((err) => {
			console.error(err);
		});
});
