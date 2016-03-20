var $ = jQuery = require('jQuery');

module.exports = {
    Workspaces: function() {
    	return {
    		restrict: 'AE',
    		template: '<div ng-repeat="org in orgs" data-ng-organization></div>',
    		controller: function($rootScope, $scope) {
    		},
    		link: function postLink(scope, element, attrs) {

    		}
    	}
    },
    Organization: function() {
    	return {
    		restrict: 'AE',
    		templateUrl: 'assets/templates/organization.html',
    		controller: function($rootScope, $scope, $filter) {
    			// angular.forEach(space in $scope.org.spaces)
    			$scope.filteredList = $scope.org.spaces;
    		}
    	}
    },
    WorkspaceItem: function() {
    	return {
    		restrict: 'AE',
    		templateUrl: 'assets/templates/workspaceitem.html',
    		controller: function ($rootScope, $scope, AppService) {
                $scope.tabIndex = ++AppService.workItemTabIndex;
    		},
            link: function(scope, element, attrs) {
                $(element).find('a').attr("tabindex", scope.tabIndex);
            }

    	}
    }
}