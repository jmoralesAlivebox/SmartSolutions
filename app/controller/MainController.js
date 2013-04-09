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
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'loginRegister');
    }
});