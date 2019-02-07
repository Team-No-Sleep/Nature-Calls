// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').Server(app);
const socketio = require('socket.io')(server);
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const PORT = process.env.PORT || 3001
const sessions = {}//user sessions for socket.io
// const websocket = socketio(server); //Initiate Socket



// websocket.emit('channel2', 'new channel');
// websocket.on('channel2', (obj) => {
//   console.log('Object from RN app', obj);
// }

// ===== socket.io =====s
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/server/index.html');
});
//generate session ids for socket
function generateId(len) {
	let result = "";
	for (let i = 0; i < len; i++) {
		result += Math.floor(Math.random() * 10);
	}
	return result;
}

function isDinoSelected(dino){
	for(let key in sessions){
		if(sessions[key].dino === dino){
			return sessions[key];
		}
	}
	return null;
}

socketio.on('connection', function (socket) {
	//console.log(socketio.sockets);

	console.log("CONNECTED USERS: ", socketio.engine.clientsCount);
	console.log(socket.id);
	socket.on('update', () => socketio.emit('update'));

	//sending dino positioning through socket
	socket.on('position', (data) => {
		let numberOfPlayers = socketio.engine.clientsCount;
		socketio.emit('position', data);
	});
	socket.on("registerPlayer", (data, callback) => {
		console.log(data);
		sessions[data.user.local.username] = {
			user: data.user.local.username,
			dino: null
		};
		let marioSelected = isDinoSelected("mario");
		let dino2Selected = isDinoSelected("dino2");
		console.log(marioSelected);
		console.log(dino2Selected);
		callback(null, {
			success: true,
			dinoTaken:  (marioSelected) ? marioSelected : dino2Selected 
		});
	});
	socket.on("selectDino", (data, callback) => {
		console.log(data);
		if(isDinoSelected(data.dino)){
			callback(false);
		}
		sessions[data.user.local.username].dino = data.dino;
		socketio.emit("dinoSelected", {
			dino: data.dino,
			user: data.user.local.username
		});
		callback(true);
	});
});

// ===== Middleware ====
app.use(morgan('dev'));
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
);

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// ===== testing middleware =====
app.use(function (req, res, next) {
	console.log('===== passport user =======');
	console.log(req.session);
	console.log(req.user);
	console.log('===== END =======');
	next();
});
// testing
app.get(
	'/auth/google/callback',
	(req, res, next) => {
		console.log(`req.user: ${req.user}`)
		console.log('======= /auth/google/callback was called! =====')
		next()
	},
	passport.authenticate('google', { failureRedirect: '/login' }),
	(req, res) => {
		res.redirect('/auth/user')
	}
);

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, './client/build/static')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, './client/build/'))
	})
}

/* Express app ROUTING */
console.log("server.js");
app.use('/auth', require('./auth')(sessions));

// ====== Error handler ====
app.use(function (err, req, res, next) {
	console.log('====== ERROR =======');
	console.error(err.stack);
	res.status(500);
});

// ==== Starting Server =====
server.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
});

