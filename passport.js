'use strict'
'use strict'

const LocalStrategy = require('passport-local').Strategy,
	MySQL = require('./models/connect');


module.exports = passport =>{

	//Se serializa solo el id del usuario en la session
	passport.serializeUser(function(user, done) {
  		done(null, user.id);
	});

	//Se deszewrializa con el id
	passport.deserializeUser(function(id, done) {

		MySQL.query('SELECT * FROM account.account WHERE id=?', [id], (err,result) =>{
			if (err) return done(err);
			done(err,result);

		});

	});


	passport.use(new LocalStrategy(
  	function(username, password, done) {
		
		MySQL.query('SELECT * FROM account.account WHERE login=? and password=PASSWORD(?)', [username,password], (err,result) =>{

			if (err) return done(err);
			
			if (!result) return done(null,false);
			if (!err && result != null) {return done(null,result[0]);}

		});

  }
));


}
