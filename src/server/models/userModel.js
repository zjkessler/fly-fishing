	'use strict';
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var bcrypt = require('bcrypt');

	var userSchema = new Schema({

		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		userAddress: {
			state: String,
			address: String
		},
		blogList: [{
			type: Schema.Types.ObjectId,
			ref: 'Blog'
	}]
		//		weatherList: [],
		//		fishingReportList: []
	});

	userSchema.pre('save', function (next) {
		var user = this;
		if (!user.isModified('password')) {
			return next();
		}

		bcrypt.hash(user.password, 10, function (err, hash) {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});

	userSchema.methods.checkPassword = function (passwordAttempt, callback) {
		bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
			if (err) {
				return callback(err);
			}
			callback(null, isMatch);
		});
	};

	userSchema.methods.withoutPassword = function () {
		var user = this.toObject();
		delete user.password;
		return user;
	};

	module.exports = mongoose.model('User', userSchema);
