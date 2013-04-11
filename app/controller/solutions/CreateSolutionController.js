Ext.define('SmartSolutions.controller.solutions.CreateSolutionController', {

    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'txtTitle',
            selector: 'newsolutionview textfield[itemId=txtTitle]'
        },
        {
            ref: 'txtDescription',
            selector: 'newsolutionview textarea[itemId=txtDescription]'
        }

    ],

    views: [
        'solutions.NewSolutionSave',
        'solutions.NewSolutionView'
    ],

    init: function(){
        this.control({
            'newsolutionsave': {
                returnToSolutions: this.returnToSolutions,
                saveSolution: this.saveSolution
            },
            'newsolutionview': {
                addImage: this.addImage,
                filterSearch: this.filterSearch
            }
        });
    },

    saveSolution: function(){
        var tmpTitle=this.getTxtTitle();
        var tmpDescription=this.getTxtDescription();
        var tmpSolutionsStore = Ext.getStore('Solutions');
        var tmpDate = new Date();
        var tmpMonth = tmpDate.getMonth()+1;
        var tmpSolution = Ext.create('SmartSolutions.model.Solution',{
            id: tmpSolutionsStore.getCount()+1,
            title: tmpTitle.value,
            description: tmpDescription.value,
            date: tmpDate.getDate()+'/'+tmpMonth+'/'+tmpDate.getFullYear()
        });
        tmpSolutionsStore.add(tmpSolution);
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'yourSolutionsView');
    },

    returnToSolutions: function(){
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'yourSolutionsView');
    },

    addImage: function(){
        alert('Add Image')
    },

    filterSearch: function(tmpName){
        var tmpCategoriesStore = Ext.getStore('Categories');
        tmpCategoriesStore.clearFilter(true);
        tmpCategoriesStore.filter([
            {
                property: 'name',
                value: tmpName,
                anyMatch: true,
                caseSensitive: false
            }
        ]);
    }
});