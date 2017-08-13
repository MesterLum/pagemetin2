'use strict'

const express = require('express'),
	route = express.Router(),
	controllers = require('../controllers/profile');



route.get('/account/:account', controllers.profileAccount);




module.exports = route;