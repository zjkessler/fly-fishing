var app = angular.module("Auth");

app.controller("LoginCtrl", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {

	$scope.login = function (user) {
		UserService.login(user)
			.then(function (response) {
				$location.path("/product");
			}, function (response) {
				alert(response.data.message);
			});
	}
}]);