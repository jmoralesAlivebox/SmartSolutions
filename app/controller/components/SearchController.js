Ext.define('SmartSolutions.controller.components.SearchController', {

    extend: 'Ext.app.Controller',

    views: [
        'components.SearchView'
    ],

    init: function(){
        this.control({
            'search': {
                filterSearch: this.filterSearch
            }
        });
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