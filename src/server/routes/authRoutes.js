'use strict';
var express = require('express');
var authRouter = express.Router();
var User = require('../models/userModel');
var jwt = require('jsonwebtoken');
var config = require('../config');

authRouter.post('/signup', function (req, res) {

	var user = new User(req.body);
	user.save(function (err, newUser) {
		if (err) res.status(500).send(err);
		return res.send({
			success: true,
			message: 'Registered a new User',
			user: newUser
		});
	});
});

authRouter.post('/login', function (req, res) {
	User.findOne({
		email: req.body.email
	}, function (err, user) {
		if (err) res.status(500).send(err);
		if (!user) {
			res.status(401).send({
				success: false,
				message: 'User login not found'
			});
		} else if (user) {
			user.checkPassword(req.body.password, function (err, match) {
				if (err) throw (err);
				if (!match) res.status(401).json({
					success: false,
					message: 'Incorrect password'
				});
				else {
					var token = jwt.sign(user.toObject(), config.secret, {
						expiresIn: '24h'
					});

					res.json({
						token: token,
						user: user.toObject(),
						success: true,
						message: 'Here is your token'
					});
				}
			});
		}
	});
});

module.exports = authRouter;
