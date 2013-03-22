Ext.define('SmartSolutions.controller.categories.MainCategoriesController', {

    extend: 'Ext.app.Controller',

    views: [
        'categories.SelectCategoryView'
    ],
    models:[
        'ImageItem'
    ],
    stores:[
        'CategoryItems'
    ],

    init: function(){
        this.control({
            'selectcategoryview': {
                categorySelected: this.onCategorySelected
            }
        });
    },

    onCategorySelected: function(argElement){
        alert(argElement.name);
    }
});