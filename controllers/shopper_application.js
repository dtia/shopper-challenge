var Shopper = require('../models/shopper');
var Constants = require('../models/constants')

var shopper_app_routes = function(app) {

	app.get('/confirm', function(req, res) {
		res.render('confirm');
	});

	app.get('/apply', function(req, res) {
		res.render('application', { regions: Constants.REGIONS });
	});

	app.post('/shopper', function(req, res) {
		Shopper.create(req.body).then(function(shopper) {
			res.send('shopper created');	
		});		
	});
}

module.exports = shopper_app_routes;