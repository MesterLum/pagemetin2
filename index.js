'use strict'

const app = require('./app'),
	MySQL = require('./models/connect'),
	config = require('./config');



MySQL.connect(err =>{

	if (err) throw err;
	console.log('Base de datos conectada');

	app.listen(config.PORT, function (){

		console.log(`Servidor iniciado`);

	});

});