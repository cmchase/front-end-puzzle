var angular = require('angular');

var AppDirectives = require('./appDirectives');
AppDirectives.$inject = ['$rootScope', '$scope', 'AppService', '$filter']

angular.module('app', [require('angular-resource')])
	.directive('ngWorkspaces', AppDirectives.Workspaces)
	.directive('ngOrganization', AppDirectives.Organization)
	.directive('ngWorkspaceItem', AppDirectives.WorkspaceItem)
	.factory('AppService', ['$resource', require('./appService')])
	.controller('AppController', ['$scope', 'AppService', require('./appController')])