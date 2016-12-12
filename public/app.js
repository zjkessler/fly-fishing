var app = angular.module("FishApp", ["ngRoute", "Auth"])

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "home/home.html"
		})
				.when("/about", {
					templateUrl: "about/about.html",
					controller: "aboutCtrl"
				})
				.when("/weather", {
					templateUrl: "weather/weather.html",
					controller: "weatherCtrl"
				}).when("/blog", {
					templateUrl: "blog/blog.html",
					controller: "blogCtrl"
				})
}])