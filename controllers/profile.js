'use strict'

const profileModel = require('../models/profile'),
	userModel = require('../models/users');

function profileAccount(req,res){


	
	
	userModel.getIdByUsername(req.params.account)
	.then(data =>{
		
		Promise.all([userModel.getAccountByID(data.id),
					profileModel.getPlayersByID(data.id)])
					.then( datos =>{

						console.log(datos);

						res.render('profile/account_profile', {user: req.user, account : datos[0] , players : datos[1]});
						
					})
					.catch(err => {
						console.log('Hubo un error');
						res.render('profile/account_profile', {user: req.user});
					});

	})
	.catch(err =>{ 
								console.log('Hubo un error');
						res.render('profile/account_profile', {user: req.user});
	});


	


}


module.exports = {
	profileAccount
}