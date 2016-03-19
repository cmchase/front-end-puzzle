var $ = jQuery = require('jQuery'); // 85KB
var angular = require('angular') // 161KB


var AppController = require('./appController');

var app = angular.module('app', [])

app.controller('AppController', ['$scope', AppController]);

$('.logo-link').on('click', function togglePanel(event) {
	$('.workspace-aside').toggleClass('visible');
})