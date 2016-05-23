var Shopper = require('../models/shopper');
var Constants = require('../models/constants')
var _ = require('underscore');

var shopper_app_routes = function(app) {

	app.get('/confirm', function(req, res) {
		res.render('confirm');
	});

	app.get('/apply', function(req, res) {
		var regionPairs = _.pairs(Constants.REGIONS);
		res.render('application', { regions: regionPairs });
	});

	app.post('/shopper', function(req, res) {
		Shopper.upsert(req.body).then(function() {
			// set email on session
			// so application loads next time
			req.session.email = req.body.email;
			res.render('confirm_update');	
		});		
	});

	app.get('/shopper', function(req, res) {
		var email = req.query.email;

		Shopper.findOne({
			where: {
				email: email
			}
		}).then(function(shopper) {
			var regionPairs = _.pairs(Constants.REGIONS);
			res.render('edit_application', { shopper: shopper, regions: regionPairs });
		});
	});
}

module.exports = shopper_app_routes;