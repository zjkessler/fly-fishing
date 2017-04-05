var express = require("express");
var fs = require("fs");
var cheerio = require("cheerio");
var request = require("request");
var scrapeRouter = express.Router();
var Report = require("./models/reportModel");



//below used to scrape outside website for fishing report

scrapeRouter.route('/')
	.get(function (req, res) {
		console.log(" you got here")
		url = 'https://www.westernriversflyfishing.com/north_eastern_utah_report';

		request(url, function (error, response, html) {
			if (!error) {
				var $ = cheerio.load(html);

				var title, body, date;
				var report = {
					title: "",
					body: ""
				};

				$('.resource_message').filter(function () {
					var data = $(this);
					title = data.children().first().text();
					body = data.children().first().next().text();

					report.title = title;
					report.body = body.replace("\r\g", "");
				});
			}

			//delete all docs in report collection
			Report.remove(function (err, deleteReport) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.send(deleteReport);
				}
			})

			//			set new report to DB

			var newReport = new Report(report);
			newReport.save(function (err, updatedReport) {
				if (err) res.status(500).send(err);
			});
		});
	})

module.exports = scrapeRouter;