var $ = jQuery = require('jQuery');

module.exports = function($scope, AppService) {
	// TODO: Do not publish with duplicated data. use getData()
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

	$('.workspace-aside').on('keydown', function(event){
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

	$scope.sizeAside = function(){
		$('.workspace-results').css('max-height', $(window).height() * .8);
	}
	
	// https://davidwalsh.name/javascript-debounce-function
	$scope.debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	$scope.resizeCallback = $scope.debounce(function(){
		$scope.sizeAside();
	}, 250);

	// Let's make sure the Workspace Aside nav area
	// fits the window nicely on first load.
	$scope.sizeAside();
	// We don't really have any content, but it drives
	// me crazy to see so much of the background.
	$('.main-content').height($(window).height() - 100);

	window.addEventListener('resize', $scope.resizeCallback)
};