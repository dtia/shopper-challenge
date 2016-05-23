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
			// set email on session
			// so application loads next time
			req.session.email = shopper.email;
			res.send('Shopper created!');	
		});		
	});

	app.get('/shopper', function(req, res) {
		var email = req.query.email;

		Shopper.findOne({
			where: {
				email: email
			}
		}).then(function(shopper) {
			res.json(shopper);
		});
	});
}

module.exports = shopper_app_routes;