Ext.define('SmartSolutions.model.Category', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'name',
            type:'string'
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'resources/data/categories.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});