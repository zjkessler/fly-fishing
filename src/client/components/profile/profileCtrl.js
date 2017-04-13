var app = angular.module('FishApp');


app.service('ProfileService', ['$http', '$location', function ($http, $location) {
	'use strict';

	this.getProfile = function () {
		return $http.get('/api/profile')
			.then(function (response) {
				return response.data;
			});
	};

	this.updateProfile = function (user) {
		return $http.put('/api/profile/' + user._id, user)
			.then(function (response) {
				console.log(response.data);
				return response.data;
			});
	};
	this.removeProfile = function (user) {
		console.log('profile on the way to be deleted');
		return $http.delete('/api/profile/' + user._id)
			.then(function (response) {
				console.log('delete res going to ctrl');
				return response;
			});
	};
}]);

app.controller('ProfileCtrl', ['$scope', '$location', 'ProfileService', 'UserService', function ($scope, $location, ProfileService, UserService) {

	$scope.profile = '';

	(function getProfile() {
		ProfileService.getProfile()
			.then(function (response) {
				$scope.profile = response;
			});
	})();

	$scope.updateProfile = function (user) {
		ProfileService.updateProfile(user)
			.then(function (response) {
				console.log(response);
				$scope.profile = response;
				$location.path('/');
			});
	};

	$scope.deleteUser = function (user) {
		ProfileService.removeProfile(user)
			.then(function (response) {
				console.log('you deleted your profile!');
				UserService.logout();
				$location.path('/');
			});
	};

}]);
