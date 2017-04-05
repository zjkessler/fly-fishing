var app = angular.module("FishApp");

app.controller("ReportCtrl", ["$scope", "ReportService", function ($scope, ReportService) {

	$scope.Report = [];

	ReportService.getReport()
		.then(function (response) {
			$scope.Report = response;
		})

	$scope.refreshReport = function () {
		ReportService.newReport()
			.then(function (response) {
				$scope.Report = response;
			})
	}

}])

app.service("ReportService", ["$http", function ($http) {

	this.getReport = function () {
		return $http.get("/api/report")
			.then(function (response) {
				console.log(response.data)
				return response.data;
			}, function (response) {
				console.log("Error" + response.status + ":" + response.statusText);
			})
	}

	this.newReport = function () {

		//call scrape to pull report
		$http.get("/scrape")

		//call DB to get report
		return $http.get("/api/report")
			.then(function (response) {
				console.log(response.data)
				return response.data;
			}, function (response) {
				console.log("Error" + response.status + ":" + response.statusText);
			})
	}
			}])