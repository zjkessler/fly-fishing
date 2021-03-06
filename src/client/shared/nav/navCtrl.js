'use strict';
var app = angular.module('FishApp');

app.controller('NavCtrl', ['$scope', 'NavSvc', function ($scope, NavSvc) {

		$scope.navLinks = NavSvc.navLinks;
		$scope.authLinks = NavSvc.authLinks;

		$scope.currentNavItem = '';
}])

	.directive('navbar', ['UserService', function (UserService) {

		return {
			templateUrl: 'shared/nav/navbar.html',
			link: function (scope) {
				scope.UserService = UserService;
			},
			controller: 'NavCtrl'
		};
}]);
