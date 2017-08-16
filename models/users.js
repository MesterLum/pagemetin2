'use strict'

const pool = require('./connect.js');

//Obtengo el numero de cuentas
function numberRowTables(table){

	const lengthTable = new Promise((resolve,reject) =>{
	
			pool.getConnection((err, MySQL) =>{
			if (err) reject(err);

				MySQL.query('SELECT COUNT(*) as count FROM '+ table +'',(err,row) =>{
					MySQL.release();
					if (err) reject(err);
					resolve(row[0].count);
					
		
				});

		});

});

return lengthTable;

}

//Obtener la cantidad de usuarios conectados en 5 y 24 horas

function getUsersOnline(interval){

	const usersOnline = new Promise((resolve, reject) =>{
		
		pool.getConnection((err, MySQL) =>{
			if (err) reject(err);
			MySQL.query('SELECT COUNT(*) as count FROM player.player WHERE DATE_SUB(NOW(), INTERVAL '+ interval +' MINUTE) < last_play;',(err,row) =>{

				MySQL.release();
				if (err) reject(err);
				resolve(row[0].count);
				
			
			});

		});


		

	});

	return usersOnline;
}

//Obtener todos los usuarios registrados

function allRowsAccount(){

	
	const allRow = new Promise((resolv, reject) =>{

		pool.getConnection((err, MySQL) =>{
			if (err) reject(err);

			MySQL.query('SELECT id,login,email,social_id,status,create_time FROM account.account', (err,row) =>{
				MySQL.release();
				if (err) reject(err);
				resolv(row);
				
			});

		});


		

	});

	return allRow;

}

//Obtener el ID a travez de el usuario

function getIdByUsername(username){

	const id = new Promise((resolv, reject) =>{
		
		pool.getConnection((err, MySQL) =>{
			if (err) reject(err);

			MySQL.query('SELECT id FROM account.account WHERE login=?',[username], (err,row) =>{
				MySQL.release();
				if (err) reject(err);
				resolv(row[0]);
				
			
			});
		});


		

	});
	
	return id;
}

//Obtener el usuario con el ID

function getAccountByID(id){

		const account = new Promise((resolv, reject) =>{
			
		pool.getConnection((err, MySQL) =>{

			if (err) reject(err);

			MySQL.query('SELECT login,email,web_admin,status,coins,create_time FROM account.account WHERE id=?',[id], (err,row) =>{
				MySQL.release();
				if (err) reject(err);
				resolv(row[0]);
				
			});
		});



		

	});
	
	return account;

}

//Esto se utilizara para cambiar el status de las cuentas

function updateAccount(id, estado){

		const status = new Promise((resolv, reject) =>{
			
		pool.getConnection((err, MySQL) =>{

			if (err) reject(err);

			MySQL.query('UPDATE account.account SET status = ? WHERE id= ?',[estado,id], (err,row) =>{
				MySQL.release();
				if (err) reject(err);
				resolv(1);
				
			});
		});



		

	});
	
	return status;
}




module.exports = {

	numberRowTables,
	allRowsAccount,
	getIdByUsername,
	getAccountByID,
	getUsersOnline,
	updateAccount

}