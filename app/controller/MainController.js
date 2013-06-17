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
        Ext.Ajax.request({
            method: 'GET',
            url: SmartSolutions.defaults.WebServices.USER_SIGN_OUT,
            success: this.onSignOutSuccess
        })

    },

    onSignOutSuccess: function(){
        Mercury.core.ViewsManager.reconfigureViewsAndShowPage('loginRegister');
    }

});