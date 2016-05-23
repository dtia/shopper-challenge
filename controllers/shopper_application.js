var shopper_app_routes = function(app) {

	app.get('/confirm', function(req, res) {
		res.render('confirm');
	});

	app.get('/apply', function(req, res) {
		res.render('application');
	});
}

module.exports = shopper_app_routes;