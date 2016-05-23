var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(session({secret: 'sh0pp3rs3cr3t'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var shopper_app_routes = require('./controllers/shopper_application.js')(app);
var funnel_routes = require('./controllers/funnels.js')(app);
var db = require('./db/db_conn');

app.get('/', function (req, res) {
	if (req.session.email) {
		return res.redirect('/shopper?email=' + req.session.email);
	}

  	res.render('home');
});

app.set('view engine', 'ejs');

app.listen(3000, function () {
 	console.log('Listening on port 3000!');
});