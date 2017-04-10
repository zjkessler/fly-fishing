'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({

	title: String,
	feedId: String,
	reader: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Blog', blogSchema);
