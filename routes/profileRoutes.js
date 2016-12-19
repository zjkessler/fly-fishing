var express = require("express");
var profileRoute = express.Router();
var User = require("../models/userModel");

profileRoute.route("/")
	.get(function (req, res) {
		User.findById({
			_id: req.user._id
		}, function (err, user) {
			console.log(user);
			if (err) res.status(500).send(err);
			res.send(user);
		})
	})

profileRoute.route("/:userid")
	.put(function (req, res) {
		console.log(req.params.userid)
		User.findByIdAndUpdate(req.params.userid, req.body, {
			new: true
		}, function (err, updateUser) {
			if (err) {
				res.status(500).send(err)
			} else {
				res.send(updateUser);
			}
		})
	})

module.exports = profileRoute;