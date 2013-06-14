Ext.define('SmartSolutions.controller.solutions.YourSolutionsController', {

    extend: 'Ext.app.Controller',

    views: [
        'solutions.YourSolutionsView'
    ],

    init: function(){
        this.control({
            'yoursolutionsview': {
                openNewSolutionView: this.openNewSolutionView
            }
        });
    },

    openNewSolutionView: function(){
        Mercury.core.ViewsManager.showPage('newSolutionView');
    }
});