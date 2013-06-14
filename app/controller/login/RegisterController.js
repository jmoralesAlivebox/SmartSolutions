Ext.define('SmartSolutions.controller.login.RegisterController', {

    extend: 'Ext.app.Controller',

    views: [
        'login.Register'
    ],

    refs:[
        {
            ref: 'registerform',
            selector: 'registerform [itemId=registerformcontainer]'
        }
    ],

    init: function(){
        this.control({
            'register': {
                signup: this.onSignup
            }
        });
    },

    onSignup: function(){
        var tmpRegister = this.getRegisterform();
        if( tmpRegister.isValid() ){
            var tmpUser = tmpRegister.getRecord();
            tmpUser.save({
                scope: this,
                success: this.onSuccessSignup,
                urlOverride: SmartSolutions.defaults.WebServices.USER_REGISTER
            });
        }
    },

    onSuccessSignup: function(argRecord){
        var tmpCurrentUser = argRecord;
        // add the permission to the second argument
        Mercury.core.SecurityManager.logInUser(tmpCurrentUser.get('email'),[]);
        Mercury.core.ViewsManager.reconfigureViewsAndShowPage('categoriesView');
    }

});