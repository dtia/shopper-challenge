var _ = require('underscore');

var CalendarUtil = {

	getCalendarWeek: function(app_date) {
		var first = app_date.getDate() - app_date.getDay() + 1; // first day is the day of the month - the day of the week + 1 to start from Monday
		var last = first + 6; // last day is the first day + 6

		var firstDay = new Date(app_date.setDate(first));
		var lastDay = new Date(app_date.setDate(last));
		
		var startDateString = firstDay.getFullYear() + '-' + (firstDay.getMonth()+1) + '-' + firstDay.getDate();
		var endDateString = lastDay.getFullYear() + '-' + (lastDay.getMonth()+1) + '-' + lastDay.getDate();
		return startDateString + '-' + endDateString;
	}
};

module.exports = CalendarUtil;