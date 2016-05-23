var sequelize = require('../db/db_conn');
var DataTypes = require('sequelize/lib/data-types');

var Shopper = sequelize.define('shopper', {
	firstname: {
		type: DataTypes.STRING,
		required: true
	},
	lastname: {
		type: DataTypes.STRING,
		required: true
	},
	phone: {
		type: DataTypes.STRING,
		required: true	
	},
	email: {
		type: DataTypes.STRING,
		required: true
	},
	region: {
		type: DataTypes.STRING,
		required: true
	},
	workflow_state: {
		type: DataTypes.STRING,
		required: true,
		defaultValue: 'applied'
	}
}, {
	freezeTableName: true
});


Shopper.sync();

module.exports = Shopper;