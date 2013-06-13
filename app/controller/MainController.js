Ext.define('SmartSolutions.controller.MainController', {

    extend: "Ext.app.Controller",

    views: [
        'Header'
    ],

    init:function () {
        this.control({
            'smartsolutionsheader': {
                signOut: this.signOut
            }
        });
    },

    signOut: function(){
        Mercury.core.EventBus.fireEvent(Mercury.core.FrameworkEvents.EVENT_SHOW_PAGE, 'loginRegister');
    }
});