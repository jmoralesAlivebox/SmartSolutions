Ext.define('SmartSolutions.controller.login.LoginController', {

    extend: 'Ext.app.Controller',

    views: [
        'login.Login',
        'categories.CategoriesView'
    ],

    init: function(){
        this.control({
            'login': {
                validateLogin: this.validateLogin,
                forgotPassword: this.forgotPassword
            }
        });
    },

    validateLogin: function(){
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'yourSolutionsView');
    },

    forgotPassword: function(){
        var popUpForgotPassword = Ext.widget('forgotPassword');
        popUpForgotPassword.show();
    }

});