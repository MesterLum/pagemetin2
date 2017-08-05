'use strict'

const MySQL = require('mysql'),
	config = require('../config');


const connection = MySQL.createConnection({

	host : config.DB_HOST,
	user : config.DB_USER,
	password : config.DB_PASS,
	port : config.DB_PORT,
	//database : config.DB_TABLE

});



module.exports = connection;
