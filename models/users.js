'use strict'

const MySQL = require('./connect.js');

//Obtengo el numero de cuentas
function numberRowTables(colum,table){

	const lengthTable = new Promise((resolve,reject) =>{

	MySQL.query('SELECT '+ colum +' FROM '+ table +'',(err,row) =>{

		if (err) reject(err);
		
		resolve(row.length);

	});

});

return lengthTable;

}

//Obtener todos los usuarios registrados

function allRowsAccount(){

	
	const allRow = new Promise((resolv, reject) =>{

		MySQL.query('SELECT id,login,email,social_id,status,create_time FROM account.account', (err,row) =>{

			if (err) reject(err);
			
			resolv(row);

		});

	});

	return allRow;

}

//Obtener el ID a travez de el usuario

function getIdByUsername(username){

	const id = new Promise((resolv, reject) =>{

		MySQL.query('SELECT id FROM account.account WHERE login=?',[username], (err,row) =>{
			if (err) reject(err);
			resolv(row[0]);

		});

	});
	
	return id;
}

//Obtener el usuario con el ID

function getAccountByID(id){

		const account = new Promise((resolv, reject) =>{

		MySQL.query('SELECT login,email,web_admin,status,coins,create_time FROM account.account WHERE id=?',[id], (err,row) =>{
			if (err) reject(err);
			resolv(row[0]);

		});

	});
	
	return account;

}




module.exports = {

	numberRowTables,
	allRowsAccount,
	getIdByUsername,
	getAccountByID

}