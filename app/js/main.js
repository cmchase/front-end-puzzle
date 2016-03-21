var angular = require('angular');

var AppDirectives = require('./appDirectives');

angular.module('app', [require('angular-resource')])
	.directive('ngWorkspaces', AppDirectives.Workspaces)
	.directive('ngOrganization', AppDirectives.Organization)
	.directive('ngWorkspaceItem', AppDirectives.WorkspaceItem)
	.factory('AppService', ['$resource', require('./appService')])
	.filter('highlight', ['$sce', function($sce){
		return function(text, filterText) {
			if (filterText) {
				text = text.replace(new RegExp('(' 
					+ filterText 
					+ ')', 'gi'), 
				'<span class="highlighted">$1</span>');
			}
			return $sce.trustAsHtml(text);
		}
	}])
	.controller('AppController', ['$scope', 'AppService', '$sce', require('./appController')])