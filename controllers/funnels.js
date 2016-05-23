var Shopper = require('../models/shopper');
var Constants = require('../models/constants')
var _ = require('underscore');
var CalendarUtil = require('../utils/CalendarUtil');

var funnel_routes = function(app) {

	app.get('/funnels.json', function(req, res) {
		var startDate = req.query.startDate;
		var endDate = req.query.endDate;

		if (!startDate || !endDate) {
			return res.json({
				error: 'Missing start or end dates'
			});
		}

		// TODO: should add more validation here to make sure the date is the right format

		var startDateArr = startDate.split('-');
		var startDateObject = new Date(startDateArr[0], startDateArr[1]-1, startDateArr[2]);
		var endDateArr = endDate.split('-');
		var endDateObject = new Date(endDateArr[0], endDateArr[1]-1, endDateArr[2]);

		Shopper.findAll({
			where: {
				createdAt: {
					gt: startDateObject,
					lt: endDateObject
				}
			}
		}).then(function(shoppers) {
			var weeks = {};

			// check if bucket with week exists, otherwise create it
			_.each(shoppers, function(shopper) {
				var calendarWeek = CalendarUtil.getCalendarWeek(shopper.createdAt);
				if (weeks[calendarWeek]) {
					weeks[calendarWeek][shopper.workflow_state]++;
				}
				else {
					var states = {
						applied: 0,
						quiz_started: 0,
						quiz_completed: 0,
						onboarding_requested: 0,
						onboarding_completed: 0,
						hired: 0,
						rejected: 0
					};
					states[shopper.workflow_state]++;
					weeks[calendarWeek] = states;
				}
			});

			res.json(weeks);
		});
	});
};

module.exports = funnel_routes;