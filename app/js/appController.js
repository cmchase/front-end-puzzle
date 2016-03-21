var $ = jQuery = require('jQuery');
var scrollIntoView = require('scroll-into-view');

module.exports = function($scope, AppService, $sce) {
	// Get the data as provided
    $scope.getData = function() {
    	// This property is used to show our
    	// helper button to toggle More/Less data
    	$scope.hasMoreData = false;
    	AppService.getData().$promise.then(function(data){
	    	$scope.orgs = data;
	    });
    };

    $scope.getData();

    // Get the data duplicated a few times so we can
    // test out scrolling and keyboard navigation.
    $scope.getDuplicatedData = function() {
    	$scope.hasMoreData = true;
    	AppService.getDuplicatedData().$promise.then(function(data){
	    	$scope.orgs = data;
	    });
    };

    $scope.filterText = ""

    // Compares the value of a given object
    // and one of its properties against the 
    // search/filter text
    $scope.filterByProp = function(item, prop) {
    	if (!$scope.filterText 
    		|| (item[prop].toLowerCase().indexOf($scope.filterText.toLowerCase()) !== -1)) {
    			return true;
    	}
    	return false;
    };

    $scope.triggerSearch = function(event){
		event.stopPropagation();
    	$('#filterText').focus();    	
		$('.workspace-aside').addClass('visible');
    };

    $scope.clearSearch = function(){
    	$scope.filterText = "";
    };

    // Just a little helper so that we can show
    // something meaningful if we don't have
    // any visible organizations.
    $scope.hasOrgs = function() {
    	// Let's hit the next digest cycle with a 
    	// zero-duration timeout.
    	setTimeout(function(){
    		if($('.workspace-org:visible').length > 0) {
	            $('.no-orgs').hide();
	            var ws = $('.workspace-org:visible');
	            ws.removeClass('.last-org');
	            ws.last().addClass('last-org');
	        } else {
	            $('.no-orgs').show();
	        }
	    }, 0);
    };

	$scope.keyCodes = {
		'enter': 13,
		'esc': 27,
		'up': 38,
		'down': 40
	};

	// Let's size our flyout based on the window's height
	$scope.sizeAside = function(){
		$('.workspace-results').css('max-height', $(window).height() * .8);
	}
	
	// https://davidwalsh.name/javascript-debounce-function
	// This method helps us delay responses to events
	// so that we don't go crazy updating the DOM with
	// each callback. Very useful for resizing and scrolling events.
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

	// We'll bind this to the window resize event
	$scope.resizeCallback = $scope.debounce(function(){
		$scope.sizeAside();
	}, 250);

	// Called when the user hits the up/down keys while
	// focused on the workspace overlay.
	$scope.upDown = function(event, direction) {
		var tabindex = $(event.target).attr('tabindex');
		var $ele = $(event.target);
		if ($ele.hasClass('filter-text')) {
			if (direction === 'up') {
				$('.workspace-link:visible').last().focus();
			} else {
				$('.workspace-link:visible').first().focus();
			}
		} else if($ele.hasClass('workspace-link')) {
			var activeItemIndex, nextItem;
			$('.workspace-link:visible').each(function(index){
				if ($(this).attr('tabindex') == $ele.attr('tabindex')) {
					activeItemIndex = index;
				}
			});
			if (direction === 'up') {
				activeItemIndex--;
			} else {
				activeItemIndex++;
			}
			nextItem = $($('.workspace-link:visible')[activeItemIndex]);
			if (nextItem.length > 0) {
				// Firefox really wasn't happy using 
				// focus to shift its scroll position,
				// so I'm using a plugin for that.
				scrollIntoView(nextItem);
				nextItem.focus()
				// To let the plugin do its thing,
				// we need to prevent the auto-scrolling
				// on focus.
				event.preventDefault();
			} else {
				$('#filterText').focus();
				// Let's take the user back to the top
				// of our results window to prevent confusion
				$('.workspace-results').scrollTop(0);
			};
		};
	};

	// Let's watch for some keyboard events while the user
	// is focused on the workspace overlay.
	$scope.workspaceKeyNav = function($event){
		switch($event.keyCode) {
			case $scope.keyCodes.enter:
				if ($($event.target).hasClass("filter-text")) {
					$scope.upDown($event, 'down');
					// Firefox immediate fires off the link,
					// so we need to disable that when changing
					// focus with keyboard nav.
					$event.preventDefault();
				}
				break;
    		case $scope.keyCodes.esc:
    			$scope.filterText = "";
				$('.workspace-aside').removeClass('visible');
    			break;
			case $scope.keyCodes.down:
				$scope.upDown($event, 'down');
				break;
			case $scope.keyCodes.up:
				$scope.upDown($event, 'up');				
				break;
			default:
				break;
    	};
	};

    // Let's hide the workspace overlay when a 
    // user clicks outside of it. I'm using
    // 'window' in case the body element
    // isn't tall enough
	$(window).on('click', function hideAside(){
		$('.workspace-aside').removeClass('visible');
	});

	// Let's show our workspace search overlay
	$('#workspaceTrigger').on('click', function togglePanel(event) {
		$scope.triggerSearch(event);
	});


	// Since we're dismissing the overlay on window click,
	// we need to prevent that event from firing via bubbling
	// up from clicks in the overlay itself
	$('.workspace-aside').on('click', function clickAside(event) {
		event.stopPropagation();
	});

	// Let's make sure the Workspace Aside nav area
	// fits the window nicely on first load.
	$scope.sizeAside();

	window.addEventListener('resize', $scope.resizeCallback)
};