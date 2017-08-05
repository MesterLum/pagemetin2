'use strict'

const express = require('express'),
	app = express(),
	http = require('http').createServer(app),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	atpl = require('atpl'),
	passport = require('passport'),
	session = require('express-session'),
	config = require('./config'),
	cookieParser = require('cookie-parser');

require('./passport')(passport);
//app.use(morgan('dev'));
//Configuracion ruta static
app.use('/', express.static(__dirname + '/static'));



//Indicamos que usaremos sessiones para almacenar los usuarios
app.use(cookieParser(config.SECRET_SESSION));
//Peticiones HTTP
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(session({
  secret: config.SECRET_SESSION,
  resave: false,
  saveUninitialized: true
  //cookie: { secure: true }
}));


//passport

app.use(passport.initialize());
app.use(passport.session());


app.get('/',(req,res,next) =>{

	if (req.login) res.redirect('/admin');
	next();

	}, (req,res) =>{

	res.render('auth/login' , {tittle: 'Metin2 Login'});
});

app.post('/login',passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/',
                                   failureFlash: true })
								   
);
//Motor de plantillas
app.engine('html', atpl.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');






module.exports = http;