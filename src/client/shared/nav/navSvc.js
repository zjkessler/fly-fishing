'use strict';
var app = angular.module('FishApp');

app.value('NavSvc', {
	navLinks: [{
		title: 'Blog',
		disabled: false
}, {
		title: 'Reports',
		disabled: false
}, {
		title: 'Weather',
		disabled: true
}, {
		title: 'About',
		disabled: true
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
