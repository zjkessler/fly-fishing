'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = new Schema({

	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Report', reportSchema);
