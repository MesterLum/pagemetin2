'use strict'

const express = require('express'),
	route = express.Router(),
	controllers = require('../controllers/admin'),
	banRoute = express.Router();


route.get('/', controllers.index);

route.get('/users/list', controllers.listAccounts);
route.get('/users/ban', controllers.updateStatus);


module.exports = route;