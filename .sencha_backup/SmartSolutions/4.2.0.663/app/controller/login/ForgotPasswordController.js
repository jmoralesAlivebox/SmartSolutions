Ext.define('SmartSolutions.controller.login.ForgotPasswordController', {

    extend: 'Ext.app.Controller',

    views: [
        'login.ForgotPassword'
    ],

    init: function(){
        this.control({
            'forgotPassword':{
                resetUser: this.resetUser
            }
        });
    },

    resetUser: function(){
        alert('Reset User');
    }

});