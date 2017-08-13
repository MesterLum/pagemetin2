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
	cookieParser = require('cookie-parser'),
	adminRoute = require('./routes/admin'),
	isAuth = require('./middleware/auth'),
	cors = require('cors'),
	routeProfile = require('./routes/profile'),
	favicon = require('serve-favicon');

require('./passport')(passport);
//app.use(morgan('dev'));
//Configuracion ruta static
app.use('/', express.static(__dirname + '/static'));

app.use(favicon(__dirname + '/static/favicon.ico'));





//Indicamos que usaremos sessiones para almacenar los usuarios
app.use(cookieParser(config.SECRET_SESSION));
//Peticiones HTTP

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(session({
  secret: config.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
  //cookie: { secure: true }
}));


app.use(cors());


//passport

app.use(passport.initialize());
app.use(passport.session());
//Error 404


//Inicio.
app.get('/',(req,res) =>{
	
	if (req.isAuthenticated()) res.redirect('/admin');
	res.render('auth/login' , {tittle: 'Metin2 Login'});

});


app.post('/login',passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/',
                                   failureFlash: true })
								   
);

app.get('/logout', (req,res) =>{
	
	req.logout();
	res.redirect('/');

});
//Rutas para el panel admin

app.use('/admin',isAuth, adminRoute);
app.use('/admin/profile',isAuth, routeProfile);

//
app.use((req,res) =>{

	res.status(404).render('404');

});
//Motor de plantillas
app.engine('html', atpl.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');







module.exports = http;