Ext.define('SmartSolutions.controller.categories.SearchController', {

    extend: 'Ext.app.Controller',

    views: [
        'categories.SearchView'
    ],

    init: function(){
        this.control({
            'search': {
                openNewSolutionView: this.openNewSolutionView,
                filterSearch: this.filterSearch
            }
        });
    },

    openNewSolutionView: function(){
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'newSolutionView');
    },

    filterSearch: function(tmpTitle){
        var tmpSolutionsStore = Ext.getStore('Solutions');
        tmpSolutionsStore.clearFilter(true);
        tmpSolutionsStore.filter([
            {
                property: 'title',
                value: tmpTitle,
                anyMatch: true,
                caseSensitive: false
            }
        ]);
    }
});