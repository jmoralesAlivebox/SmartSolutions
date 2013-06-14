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
            tmpUser.save({
                scope: this,
                success: this.onSuccessLogin,
                urlOverride: SmartSolutions.defaults.WebServices.USER_AUTHENTICATION
            });
        }
    },

    onSuccessLogin: function(argRecord){
        var tmpCurrentUser = argRecord;
        // add the permission to the second argument
        Mercury.core.SecurityManager.logInUser(tmpCurrentUser.get('email'),[]);
        Mercury.core.ViewsManager.reconfigureViewsAndShowPage('yourSolutionsView');
    },

    forgotPassword: function(){
        var popUpForgotPassword = Ext.widget('forgotPassword');
        popUpForgotPassword.show();
    }

});