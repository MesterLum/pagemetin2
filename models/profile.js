'use strict'

const userModel = require('./users'),
	pool = require('./connect');

//Con este modelo voy a traer todos los datos los perfiles
function profileAccount(username){


}

//Con esta funcion voy a traer todos los players de esta cuenta

function getPlayersByID(id){

	const players = new Promise((resolv, reject) =>{
		
		pool.getConnection((err, MySQL) =>{

			MySQL.query(`SELECT player.player.name,player.player.job,player.player.level,player.player.playtime, player.player_index.empire as reino,
							player.guild.name as gremio
					 FROM player.player INNER JOIN player.player_index ON player.player.account_id = player.player_index.id
					 INNER JOIN player.guild ON player.player.id = player.guild.id
					 WHERE player.player.account_id = ?`,[id], (err,row) =>{
				MySQL.release();
				if (err) reject(err);
				resolv(row);
			
			});
		});


	

	})

	return players;

}

//Actividad profile

function activityLevelUpAccount(id){

	const activity = new Promise((resolve, reject) =>{

		pool.getConnection((err, MySQL) =>{

			MySQL.query(`SELECT name,level FROM log.levellog WHERE account_id=? LIMIT 100`,[id],(err,row) =>{
				MySQL.release();

				if (err) reject(err);
				resolve(row);

			});

		});
		
	});

	return activity;
}

function isGM(account){

	const isGM = new Promise((resolve, reject) =>{

		pool.getConnection((err, MySQL) =>{

			MySQL.query(`SELECT COUNT(*) as count FROM common.gmlist WHERE mAccount = ?`,[account],(err,row) =>{
				MySQL.release();

				if (err) reject(err);
				resolve(row[0]);

			});

		});
		
	});

	return isGM;
}

function getLogGM(id){

	const logGM = new Promise((resolve, reject) =>{

		pool.getConnection((err, MySQL) =>{

			MySQL.query(`
						SELECT 
							log.command_log.username as nombre,  log.command_log.command, DATE(log.command_log.date) as fecha
						FROM 
							log.command_log
						INNER JOIN 
							player.player 
						WHERE 
							log.command_log.username = player.player.name AND player.player.account_id = ? LIMIT 100`,[id],(err,row) =>{
				MySQL.release();

				if (err) reject(err);
				resolve(row);

			});

		});
		
	});

	return logGM;

}



module.exports = {
	profileAccount,
	getPlayersByID,
	activityLevelUpAccount,
	isGM,
	getLogGM
}