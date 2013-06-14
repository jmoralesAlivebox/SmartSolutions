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
        Mercury.core.ViewsManager.reconfigureViewsAndShowPage('loginRegister');
    }
});