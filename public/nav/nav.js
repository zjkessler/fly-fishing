var app = angular.module("FishApp");

app.directive("navbar", ["UserService", function (UserService) {


	return {
		templateUrl: "nav/nav.html",
		link: function (scope) {
			scope.UserService = UserService;
		}
	}
}]);