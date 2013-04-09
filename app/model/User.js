Ext.define('SmartSolutions.model.User', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'username',
            type:'string'
        },
        {
            name:'password',
            type:'string'
        },
        {
            name:'email',
            type:'string'
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'resources/data/users.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});