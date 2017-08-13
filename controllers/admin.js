'use strict'
const userModel = require('../models/users');

function index(req,res){
	
	
	var promiseAccounts = userModel.numberRowTables('id','account.account'),
		promisePlayers = userModel.numberRowTables('id','player.player'),
		promiseGms = userModel.numberRowTables('mID','common.gmlist');


//Esta version carga lento, para que cargue más rapido comentarla.
	Promise.all([promiseAccounts, promisePlayers, promiseGms])
	.then( data =>{
		res.render('index', {user : req.user, data : data});
	})
	.catch( err =>{
		res.render('index', {user : req.user});
	})
	
//Descomentar esto para que cargue un poco más rapido
	//res.render('index', {user : req.user});
	

}


//Lista de cuentas en una URL /admin/users/list/:opt

function listAccounts(req,res){


		userModel.allRowsAccount()
		.then(data =>{
			
			res.render('accounts_list', {user: req.user, accounts : data});

		})
		.catch(err => {
			console.log(err);
		});



}


module.exports = {
	index,
	listAccounts
}