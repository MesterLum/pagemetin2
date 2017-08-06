'use strict'

function isAuth(req,res,next){

	if (!req.isAuthenticated()) return res.redirect('/');
	next();

}

module.exports = isAuth;