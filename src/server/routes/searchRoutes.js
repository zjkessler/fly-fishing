'use strict';
var express = require('express');
var request = require('request');
var searchRouter = express.Router();
var Blog = require('../models/blogModel');
var User = require('../models/userModel');

searchRouter.route('/')
	.get(function (req, res) {

		var search = req.query.q;
		request('http://www.feedly.com/v3/search/feeds?q=' + search, function (error, response, body) {
			res.send(JSON.parse(body));
		});
	})
	.post(function (req, res) {
		var blog = new Blog(req.body);
		blog.reader = req.user._id;
		blog.save(function (error) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.send(blog);
			}
		});
	});


module.exports = searchRouter;
