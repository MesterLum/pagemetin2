'use strict'

const profileModel = require('../models/profile'),
	userModel = require('../models/users');

function profileAccount(req,res){

	const account = req.params.account;

	userModel.getIdByUsername(account)
	.then(data =>{
		
		Promise.all([userModel.getAccountByID(data.id),
					profileModel.getPlayersByID(data.id),
					profileModel.activityLevelUpAccount(data.id),
					profileModel.isGM(account),
					profileModel.getLogGM(data.id)])
					.then( datos =>{

						//Modifico el tipo de fecha en el registro
						var fechaRegistro = new Date(datos[0].create_time);
						if (fechaRegistro.getDate())
							datos[0].create_time = `${fechaRegistro.getFullYear()} - ${fechaRegistro.getMonth()} - ${fechaRegistro.getDay()}`;
						else
							datos[0].create_time = 'No Hay Fecha';
						var isGm;

						if (datos[3].count > 0) isGm = true;
						else isGm = false;


						res.render('profile/account_profile', {
																user: req.user,
																account : datos[0],
																players : datos[1],
																log_levelup : datos[2],
																isGm : isGm
																
															  });
						
					})
					.catch(err => {
						console.log(err);
						res.render('profile/account_profile', {user: req.user});
					});

	})
	.catch(err =>{ 
								console.log(err);
						res.render('profile/account_profile', {user: req.user});
	});


	


}


module.exports = {
	profileAccount
}