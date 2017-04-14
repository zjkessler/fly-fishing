'use strict';
var express = require('express');
var reportRoute = express.Router();
var Report = require('../models/reportModel');

reportRoute.route('/')
	.get(function (req, res) {
		Report.find(function (err, report) {
			console.log(report);
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(report);
			}
		});
	})
	.post(function (req, res) {
		console.log(req.body);
		var report = new Report(req.body);
		report.save(function (err) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(report);
			}
		});
	});
reportRoute.route('/:reportId')
	.delete(function (req, res) {
		Report.findByIdAndRemove({
			_id: req.params.reportId
		}, function (err, deleteReport) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(deleteReport);
			}
		});
	});
module.exports = reportRoute;
