'use strict';
var app = angular.module("FishApp");

app.controller("NavCtrl", ["$scope", function ($scope) {

		$scope.links = [{
			title: "Home",
			state: "home"
		}, {
			title: "Blog",
			state: "blog"
		}, {
			title: "Weather",
			state: "weather"
		}, {
			title: "Fishing Reports",
			state: "reports"
		}, {
			title: "About",
			state: "about"
		}, {
			title: "Login",
			state: "login"
		}, {
			title: "Signup",
			state: "signup"
		}];

		$scope.currentNavItem = "";
}])

	.directive("navbar", ["UserService", function (UserService) {

		return {
			templateUrl: "shared/nav/navbar.html",
			link: function (scope) {
				scope.UserService = UserService;
			},
			controller: "NavCtrl"
		};
}])
