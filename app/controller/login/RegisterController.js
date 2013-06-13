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
        Mercury.core.EventBus.fireEvent(Mercury.core.FrameworkEvents.EVENT_SHOW_PAGE, 'categoriesView');
    }

});