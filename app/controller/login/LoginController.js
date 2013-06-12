Ext.define('SmartSolutions.controller.login.LoginController', {

    extend: 'Ext.app.Controller',

    models:[
        'authentication.loginUser'
    ],

    views: [
        'login.Login',
        'login.LoginRegister',
        'categories.CategoriesView'
    ],

    refs:[
        {
            ref: 'loginform',
            selector: 'loginform [itemId=loginformcontainer]'
        }
    ],

    init: function(){
        this.control({
            'login': {
                login: this.onLogin,
                forgotPassword: this.forgotPassword
            }
        });
    },

    onLogin: function(){
        var tmpLogin = this.getLoginform();
        if( tmpLogin.isValid() ){
            var tmpUser = tmpLogin.getRecord();
            //set MD5 password
            tmpUser.save({
                scope: this,
                success: this.onSuccessLogin,
                urlOverride: SmartSolutions.defaults.WebServices.USER_AUTHENTICATION
            });
        }
    },

    onSuccessLogin: function(argRecord){
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'yourSolutionsView');
    },

    forgotPassword: function(){
        var popUpForgotPassword = Ext.widget('forgotPassword');
        popUpForgotPassword.show();
    }

});