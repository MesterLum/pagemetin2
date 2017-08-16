'use strict'

const LocalStrategy = require('passport-local').Strategy,
	pool = require('./models/connect');


module.exports = passport =>{

	//Se serializa solo el id del usuario en la session
	passport.serializeUser(function(user, done) {
  		done(null, user.id);
	});

	//Se deszewrializa con el id
	passport.deserializeUser(function(id, done) {

		pool.getConnection((err, MySQL) =>{
			if (err) return done(err);

			MySQL.query('SELECT * FROM account.account WHERE id=?', [id], (err,result) =>{

				MySQL.release();
				if (err) return done(err);
				done(err,result[0]);
				
			
			});
		})


		
	});


	passport.use(new LocalStrategy(
  	function(username, password, done) {
		
		pool.getConnection((err, MySQL) =>{

			MySQL.query('SELECT * FROM account.account WHERE login=? and password=PASSWORD(?)', [username,password], (err,result) =>{
				MySQL.release();
				if (err) return done(err);
			
				if (!result) return done(null,false);
				if (!err && result != null && result[0].web_admin == 1) {return done(null,result[0]);}
				
			});

		});



		
  }
));


}