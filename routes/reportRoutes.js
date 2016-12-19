var express = require("express");
var reportRoute = express.Router();
var Report = require("../models/reportModel");

reportRoute.route("/")
	.get(function (req, res) {
		Report.find(function (err, report) {
			console.log(report);
			if (err) res.status(500).send(err);
			res.send(report);
		})
	})

module.exports = reportRoute;