Ext.define('SmartSolutions.controller.login.RegisterController', {

    extend: 'Ext.app.Controller',

    views: [
        'login.Register'
    ],

    init: function(){
        this.control({
            'register': {
                createUser: this.createUser
            }
        });
    },

    createUser: function(){
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'categoriesView');
    }

});