'use strict';
var app = angular.module('FishApp');

app.controller('BlogCtrl', ['$scope', 'BlogService', '$window', function ($scope, BlogService, $window) {

	$scope.searchResults = [];
	$scope.blogList = [];

	//search for feeds
	$scope.searchRSS = function (query) {
		console.log(query);
		BlogService.searchRSS(query)
			.then(function (response) {
				console.log(response.results);
				$scope.searchResults = response.results;
			});
	};

	//save feed to db and attach to user
	$scope.addBlog = function (blog) {
		console.log(blog);
		BlogService.addBlog(blog)
			.then(function (response) {
				$scope.blogList.push(response.data);
			});
	};

	// get individual feedlist for display
	$scope.showBlog = (function () {
		BlogService.showBlog()
			.then(function (response) {
				console.log(response);
				$scope.blogList = response;
			});
	}());

	//get individual blog article list for display
	$scope.readBlog = function (blogListing) {
		BlogService.getOneBlog(blogListing)
			.then(function (response) {

			});
	};


	//delete individual blog from db
	$scope.deleteBlog = function (item, index) {
		console.log(item);
		BlogService.removeBlog(item)
			.then(function (response) {
				$scope.blogList.splice(index, 1);
			});
	};


	//Visit External website
	$scope.visitWebsite = function (url) {
		$window.open(url);
	};
	//clear search area
	$scope.clearSearch = function () {
		$scope.searchResults = [];
	};


			}]);

app.service('BlogService', ['$http', function ($http) {
	var config = {
		headers: {
			Authorization: 'OAuth 6b7cb13c-bb38-42b4-a6b8-5a6d3a8b0aaf'
		}
	};

	this.searchRSS = function (query) {

		return $http.get('/api/search?q=' + query)
			.then(function (response) {
				return response.data;
			}, function (response) {
				console.log(response);
				console.log('Error' + response.status + ':' + response.statusText);
			});
	};

	this.addBlog = function (blog) {
		return $http.post('/api/search', blog)
			.then(function (response) {
				return response;
			}, function (response) {
				console.log(response);
				console.log('Error' + response.status + ':' + response.statusText);
			});
	};

	this.showBlog = function () {
		return $http.get('api/read')
			.then(function (response) {
				return response.data;
			}, function (response) {
				console.log('Error' + response.status + ':' + response.statusText);
			});
	};
	//this.getOneBlog =function(){
	//
	//}

	this.removeBlog = function (blog) {
		return $http.delete('api/read/' + blog._id)
			.then(function (response) {
				return response;
			}, function (response) {
				console.log('Error' + response.status + ':' + response.statusText);
			});
	};

       }]);
