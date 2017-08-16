'use strict'
const userModel = require('../models/users');

function index(req,res){
	
	console.log(req.session);
	var promiseAccounts = userModel.numberRowTables('account.account'),
		promisePlayers = userModel.numberRowTables('player.player'),
		promiseGms = userModel.numberRowTables('common.gmlist'),
		promiseUsersOnline = userModel.getUsersOnline('5');


//Esta version carga lento, para que cargue más rapido comentarla.
	Promise.all([promiseAccounts, promisePlayers, promiseGms,promiseUsersOnline])
	.then( data =>{
		res.render('index', {user : req.user, data : data});
	})
	.catch( err =>{
		res.render('index', {user : req.user});
	})
	
//Descomentar esto para que cargue un poco más rapido
	//res.render('index', {user : req.user});
	

}


//Lista de cuentas en una URL /admin/users/list

function listAccounts(req,res){


		userModel.allRowsAccount()
		.then(data =>{
			
			data.map((obj) =>{
						var fechaRegistro = new Date(obj.create_time);
						if (fechaRegistro.getDate())
							obj.create_time = `${fechaRegistro.getFullYear()} - ${fechaRegistro.getMonth()} - ${fechaRegistro.getDay()}`;
						else
							obj.create_time = 'No Hay Fecha';
			});

			res.render('accounts_list', {user: req.user, accounts : data});

		})
		.catch(err => {
			console.log(err);
			res.render('accounts_list', {user: req.user});
		});



}

function updateStatus(req,res){
	var x = {
		"lol" : "que pedo",
		"a" : "jaja"
	}
	res.status(200).send({a : 'a'});
	const id = req.params.id,
		status = req.params.status;
		
	
	if (status != 'BLCOK' || status != 'OK')
		res.status(203).send({ message : 'Lo que envia no es correcto' });

	userModel.updateAccount(id,status)
	.then( date =>{
		console.log('Lolasnaonsduna');
		res.status(200).send({date : date});
	})
	.catch(err =>{
		res.status(302).send({message : 'Hubo un error procesando los datos'});
	})

}


module.exports = {
	index,
	listAccounts,
	updateStatus
}