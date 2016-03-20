function appService($resource){
    return {
        getData: function(){
            return $resource("../assets/templates/data.json").query();
        },
        getDuplicatedData: function(){
            return $resource("../assets/templates/dataExplosion.json").query();
        },
        // TODO: I'm not happy with storing this in the service,
        // but the $rootScope isn't working as expected.
        workItemTabIndex: 100
    }
}

module.exports = appService;