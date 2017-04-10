'use strict';
var app = angular.module('FishApp');

app.value('NavSvc', {
	links: [{
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
}]
});
