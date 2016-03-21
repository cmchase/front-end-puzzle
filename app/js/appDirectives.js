var $ = jQuery = require('jQuery');

module.exports = {
    Workspaces: function() {
    	return {
    		restrict: 'AE',
            scope: true,
            transclude: true,
    		templateUrl: 'assets/templates/workspaces.html',
    		controller: function($scope) {
    		},
    		link: function postLink(scope, element, attrs) {

    		}
    	}
    },
    Organization: function() {
    	return {
    		restrict: 'AE',
            scope: true,
    		templateUrl: 'assets/templates/organization.html',
    		controller: function($scope) {
                // Let's watch for changes to our filter criteria
                // and update each org grouping
                $scope.$watch('filterText', function(){
                    if ($scope.filterText === '') {
                        // If we don't have any filter criteria,
                        // let's show everything
                        $scope.filteredList = $scope.org.spaces;
                    } else if($scope.filterByProp($scope.org, 'name')) {
                        // If we've got a filter match in our org name,
                        // let's show everything in its collection
                        $scope.filteredList = $scope.org.spaces;
                    } else {
                        // If we don't have a match in the org name,
                        // let's run each of the spaces through our custom
                        // filter.
                        $scope.filteredList = [];
                        angular.forEach($scope.org.spaces, function(space, key) {
                            if ($scope.filterByProp(space, 'name')) {
                                $scope.filteredList.push(space);
                            }
                        });
                    }

                    // We've just updated our rendered content.
                    // Let's make sure we have some orgs to show
                    // and update the last in our collection to remove
                    // its bottom border.
                    $scope.hasOrgs();
                });
    		}
    	}
    },
    WorkspaceItem: function() {
    	return {
    		restrict: 'AE',
            scope: true,
    		templateUrl: 'assets/templates/workspaceitem.html',
    		controller: function ($scope, AppService) {
                // Each workspace link needs a tabindex but they don't
                // have direct relationships in either data or DOM, so 
                // let's use and increment a global value
                $scope.tabIndex = ++AppService.workItemTabIndex;
    		},
            link: function(scope, element, attrs) {
                // Add this item's tabindex as an attribute to the node.
                // We're using tabindex to give us context for our links
                // as well as allow the Tab key to work without extra effort.
                $(element).find('a').attr("tabindex", scope.tabIndex);
            }

    	}
    }
}