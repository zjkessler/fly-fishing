'use strict';
var app = angular.module('FishApp');

app.value('NavSvc', {
	navLinks: [{
		title: 'Blog',
		state: 'blog'
}, {
		title: 'Weather',
		state: 'weather'
}, {
		title: 'Reports',
		state: 'reports'
}, {
		title: 'About',
		state: 'about'
}],
	authLinks: [{
			title: 'Login'
		},
		{
			title: 'Signup'
		},
		{
			title: 'Logout'
		}]
});
