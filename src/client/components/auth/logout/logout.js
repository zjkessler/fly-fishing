var app = angular.module("Auth");

app.controller("LogoutCtrl", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {

	UserService.logout();
	$location.path("/");

}]);