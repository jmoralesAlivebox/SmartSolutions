Ext.define('SmartSolutions.controller.login.RegisterController', {

    extend: 'Ext.app.Controller',

    views: [
        'login.Register'
    ],

    init: function(){
        this.control({
            'register': {
                createUser: this.createUser
            }
        });
    },

    createUser: function(){
        alert('Create User');
    }

});