Ext.define('SmartSolutions.controller.categories.MainCategoriesController', {

    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'addContainer',
            selector: 'categorieslist [itemId=addContainer]'
        },
        {
            ref: 'txtCategoryName',
            selector: 'categorieslist [itemId=txtCategoryName]'
        }
    ],

    views: [
        'categories.SelectCategoryView',
        'categories.CategoriesListView',
        'components.TreeCategoryView'
    ],
    models:[
        'ImageItem',
        'Solution'
    ],
    stores:[
        'CategoryItems',
        'Categories',
        'TreeCategories',
        'Solutions'
    ],

    init: function(){
        this.control({
            'selectcategoryview': {
                categorySelected: this.onCategorySelected,
                openNewSolutionView: this.openNewSolutionView
            },
            'categorieslist': {
                showAddContainer: this.showAddContainer,
                addCategory: this.addCategory
            }
        });
    },

    onCategorySelected: function(argElement){
        //alert(argElement.name);
    },

    openNewSolutionView: function(){
        Mercury.core.ViewsManager.showPage('newSolutionView');
    },

    showAddContainer: function(){
        var tmpAddContainer = this.getAddContainer();
        tmpAddContainer.setVisible(true);
    },

    addCategory: function(){
        var tmpCategoryName=this.getTxtCategoryName();
        var tmpCategoriesStore = Ext.getStore('Categories');
        var tmpCategory = Ext.create('SmartSolutions.model.Category',{
            id: tmpCategoriesStore.getCount()+1,
            name: tmpCategoryName.value
        });
        tmpCategoriesStore.add(tmpCategory);
        tmpCategoryName.setValue("");
        var tmpAddContainer = this.getAddContainer();
        tmpAddContainer.setVisible(false);
    }
});