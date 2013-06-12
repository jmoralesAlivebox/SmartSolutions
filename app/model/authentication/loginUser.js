Ext.define('SmartSolutions.model.authentication.loginUser',{

    extend:'Ext.data.Model',

    idProperty: 'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'user_email',
            type:'string'
        },
        {
            name:'user_password',
            type:'string'
        }
    ],

    validations: [
        {
            type: 'presence',
            field: 'email',
            message: 'Email is required'
        },
        {
            type: 'email',
            field: 'email',
            message: 'Este campo debe ser una dirección de correo electrónico con el formato "usuario@dominio.com"'
        },
        {
            type: 'length',
            field: 'password',
            min: 8,
            message: 'Password must be at least 8 characters'
        }
    ],

    proxy: {
        type: 'restproxy',
        url:  SmartSolutions.defaults.WebServices.USER_AUTHENTICATION
    }

});