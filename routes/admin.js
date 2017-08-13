'use strict'

const express = require('express'),
	route = express.Router(),
	controllers = require('../controllers/admin');


route.get('/', controllers.index);

route.get('/users/list/:filter?', controllers.listAccounts);


module.exports = route;