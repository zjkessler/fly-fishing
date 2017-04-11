'use strict';
var app = angular.module('FishApp', ['ui.router', 'Auth', 'ui.bootstrap', 'ngMaterial', 'ngMdIcons']);

app.config(['$stateProvider', '$locationProvider', '$mdThemingProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $mdThemingProvider, $urlRouterProvider) {

	$locationProvider.hashPrefix('');
	$urlRouterProvider.html5Mode(true).otherwise('/');

	$stateProvider
		.state('Home', {
			url: '/',
			templateUrl: 'components/home/home.html',
		})
		.state('About', {
			url: '/about',
			templateUrl: 'components/about/about.html',
			controller: 'AboutCtrl'
		})
		.state('Weather', {
			url: '/weather',
			templateUrl: 'components/weather/weather.html',
			controller: 'WeatherCtrl'
		})
		.state('Reports', {
			url: '/report',
			templateUrl: 'components/report/report.html',
			controller: 'ReportCtrl'
		})
		.state('Blog', {
			url: '/blog',
			templateUrl: 'components/blog/blog.html',
			controller: 'BlogCtrl'
		})
		.state('Profile', {
			url: '/profile',
			templateUrl: 'components/profile/profile.html',
			controller: 'ProfileCtrl'
		});

	$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
		.accentPalette('blue');
	//.dark();
}]);
