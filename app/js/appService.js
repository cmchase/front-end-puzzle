// Let's use a service to so we can abstract changes
// around data retrieval away from the Controller
function appService($resource){
    return {
        // I'm storing the data in a local file so I don't 
        // have to worry about remote changes
        getData: function(){
            return $resource("assets/templates/data.json").query();
        },
        // The data provided wasn't long enough to test out a
        // few of the requirements, so I duplicated the original
        // objects a few times.
        getDuplicatedData: function(){
            return $resource("assets/templates/dataExplosion.json").query();
        },
        // This is also hard-coded as the filter input's
        // tabindex. We can't refer to this dynamically because
        // we're going to use this as our iterator for the links
        // generated in the WorkspaceItem directive.
        workItemTabIndex: 1000
    }
}

module.exports = appService;