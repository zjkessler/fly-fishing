'use strict';
var express = require('express');
var profileRoute = express.Router();
var User = require('../models/userModel');

profileRoute.route('/')
	.get(function (req, res) {
		User.findById({
			_id: req.user._id
		}, function (err, user) {
			console.log(user);
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(user);
			}
		});
	});

profileRoute.route('/:userId')
	.put(function (req, res) {
		console.log(req.params);
		User.findByIdAndUpdate({
				_id: req.user._id
			},
			req.body,
			function (err, updateUser) {
				if (err) {
					res.status(500).send(err);
				} else {
					console.log('you got here');
					res.send(updateUser);
				}
			});
	})
	.delete(function (req, res) {
		console.log(req.params);
		User.findByIdAndRemove({
			_id: req.params.userId
		}, function (err, deleteUser) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(deleteUser);
			}
		});
	});

module.exports = profileRoute;
