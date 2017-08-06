'use strict'

const express = require('express'),
	route = express.Router(),
	controllers = require('../controllers/admin');


route.get('/', controllers.index);


module.exports = route;