'use strict';
var app = angular.module('Auth', ['ngStorage']);

app.config(['$stateProvider', function ($stateProvider) {

	$stateProvider
		.state('Signup', {
			url: '/signup',
			templateUrl: 'components/auth/signup/signup.html',
			controller: 'SignupCtrl'
		})
		.state('Login', {
			url: '/login',
			templateUrl: 'components/auth/login/login.html',
			controller: 'LoginCtrl'
		})
		.state('Logout', {
			url: '/logout',
			controller: 'LogoutCtrl',
			template: ''
		});
	}]);

app.service('TokenService', ['$localStorage', function ($localStorage) {

	this.setToken = function (token) {
		$localStorage.token = token;
	};

	this.getToken = function () {
		return $localStorage.token;
	};

	this.removeToken = function () {
		delete $localStorage.token;
	};
	}]);

app.service('UserService', ['$http', 'TokenService', function ($http, TokenService) {

	this.signup = function (user) {
		return $http.post('/auth/signup', user);
	};

	this.login = function (user) {
		console.log(user);
		return $http.post('/auth/login', user)
			.then(function (response) {
				TokenService.setToken(response.data.token);
			});
	};

	this.logout = function () {
		TokenService.removeToken();
	};

	this.isAuthenticated = function () {
		return !!TokenService.getToken();
	};
	}]);

app.service('AuthInterceptor', ['$q', '$location', 'TokenService', function ($q, $location, TokenService) {
	this.request = function (config) {
		var token = TokenService.getToken();
		if (token) {
			config.headers = config.headers || {};
			config.headers.Authorization = 'Bearer ' + token;
		}
		return config;
	};

	this.responseError = function (response) {
		if (response.status === 401) {
			TokenService.removeToken();
			$location.path('/login');
		}
		return $q.reject(response);
	};
	}]);

app.config(function ($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});
