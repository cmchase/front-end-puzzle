var $ = jQuery = require('jQuery');

module.exports = function($scope, AppService) {
    AppService.getDuplicatedData().$promise.then(function(data){
    	$scope.orgs = data;
    });

    $scope.triggerSearch = function(){
		event.stopPropagation();
    	$("#filterText").focus();    	
		$('.workspace-aside').addClass('visible');
    };

    $scope.clearSearch = function(){
    	$scope.filterText = "";
    };

    $scope.workItemTabIndex = 100;

	$('body').on('click', function hideAside(){
		$('.workspace-aside').removeClass('visible');
	});

	$scope.keyCodes = {
		'esc': 27,
		'up': 38,
		'down': 40
	};

	$('.workspace-aside').on('keyup', function(event){
		switch(event.keyCode) {
    		case $scope.keyCodes.esc:
    			$scope.filterText = "";
				$('.workspace-aside').removeClass('visible');
    			break;
			case $scope.keyCodes.down:
				var tabindex = $(event.target).attr("tabindex");
				$('[tabindex=' + (parseInt(tabindex) + 1) + ']').focus();
				break;
			case $scope.keyCodes.up:
				var tabindex = $(event.target).attr("tabindex");
				$('[tabindex=' + (parseInt(tabindex) - 1) + ']').focus();
				break;
			default:
				break;
    	};
	});

	$('#workspaceTrigger').on('click', function togglePanel(event) {
		$scope.triggerSearch();
	});
	$('.workspace-aside').on('click', function clickAside(event) {
		event.stopPropagation();
	});
};