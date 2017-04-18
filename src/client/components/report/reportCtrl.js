'use strict';
var app = angular.module('FishApp');

app.controller('ReportCtrl', ['$scope', '$sce', '$mdToast', '$window', 'ReportService', function ($scope, $sce, $mdToast, $window, ReportService) {

	$scope.searchReport = {};
	$scope.reportList = [];
	(function () {
		ReportService.getReport()
			.then(function (response) {
				$scope.reportList = response;
			});
	}());

	$scope.saveReport = function (report) {
		console.log(report);
		ReportService.newReport(report)
			.then(function (response) {
				console.log(response);
				$scope.reportList.push(response);
				$scope.searchReport = '';
			});
	};
	$scope.removeReport = function (report, index) {
		ReportService.removeReport(report)
			.then(function (response) {
				$scope.reportList.splice(index, 1);
			});
	};
	$scope.visitBlog = function (url) {
		$window.open(url);
	};
}]);

app.service('ReportService', ['$http', function ($http) {

	this.getReport = function () {
		return $http.get('/api/report')
			.then(function (response) {
				return response.data;
			}, function (response) {
				console.log('Error' + response.status + ':' + response.statusText);
			});
	};

	this.newReport = function (reportInfo) {
		console.log(reportInfo);
		return $http.post('/api/report', reportInfo)
			.then(function (response) {
				return response.data;
			}, function (response) {
				console.log('Error' + response.status + ':' + response.statusText);
			});
	};
	this.removeReport = function (report) {
		return $http.delete('/api/report/' + report._id)
			.then(function (response) {
				return response.data;
			}, function (response) {
				console.log('Error' + response.status + ':' + response.statusText);
			});
	};
}]);
