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
        Mercury.core.EventBus.fireEvent(Mercury.core.FrameworkEvents.EVENT_SHOW_PAGE, 'newSolutionView');
    }
});