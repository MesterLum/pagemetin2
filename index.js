'use strict'

const app = require('./app'),
	pool = require('./models/connect'),
	config = require('./config');



pool.getConnection((err, MySQL) =>{

	if (err) throw err;
	console.log('BD INICIADA');
	app.listen(config.PORT, function (){

		console.log(`Servidor iniciado`);
		MySQL.release();

	});

});

