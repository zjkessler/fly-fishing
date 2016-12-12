var express = require("express");
var authRouter = express.Router();
var User = require("../models/userModel");
var jwt = require("jsonwebtoken");
var config = require("../config");

authRouter.post("/signup", function (req, res) {
	var user = new User(req.body);
	user.save(function (err, newUser) {
		if (err) return res.status(500).send(err);
		return res.send({
			success: true,
			message: "Registered a new User",
			user: newUser
		})
	})
})

authRouter.post("/login", function (req, res) {
	User.findOne({
		email: req.body.email,
		password: req.body.password
	}, function (err, user) {
		if (err) return res.status(500).send(err);
		if (user === null) {
			return res.status(401).send({
				success: false,
				message: "Name or password not found"
			})
		}

		var token = jwt.sign(user.toObject(), config.secret, {
			expiresIn: "24h"
		});

		res.send({
			token: token,
			user: user.toObject(),
			success: true,
			message: "Here is your token"
		})
	})
})

module.exports = authRouter;