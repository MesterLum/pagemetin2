'use strict'

const userModel = require('./users'),
	MySQL = require('./connect');

//Con este modelo voy a traer todos los datos los perfiles
function profileAccount(username){


}

//Con esta funcion voy a traer todos los players de esta cuenta

function getPlayersByID(id){

	const players = new Promise((resolv, reject) =>{

		MySQL.query('SELECT name,job,level,gold,playtime FROM player.player WHERE account_id=?',[id], (err,row) =>{
			if (err) reject(err);
			resolv(row);

		});

	})

	return players;

}



module.exports = {
	profileAccount,
	getPlayersByID
}