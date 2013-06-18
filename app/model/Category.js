Ext.define('SmartSolutions.model.Category', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            text:'name',
            type:'string'
        }
    ],




});