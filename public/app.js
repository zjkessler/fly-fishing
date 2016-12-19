var app = angular.module("FishApp", ["ngRoute", "Auth", "ui.bootstrap"])

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

	$locationProvider.hashPrefix("");

	$routeProvider
		.when("/", {
			templateUrl: "home/home.html"
		})
		.when("/about", {
			templateUrl: "about/about.html",
			controller: "AboutCtrl"
		})
		.when("/weather", {
			templateUrl: "weather/weather.html",
			controller: "WeatherCtrl"
		})
		.when("/report", {
			templateUrl: "report/report.html",
			controller: "ReportCtrl"
		})
		.when("/blog", {
			templateUrl: "blog/blog.html",
			controller: "BlogCtrl"
		})
		.when("/profile", {
			templateUrl: "profile/profile.html",
			controller: "ProfileCtrl"
		})
}])