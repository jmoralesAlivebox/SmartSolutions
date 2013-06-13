Ext.define('SmartSolutions.model.Solution', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'idCategory',
            type:'int'
        },
        {
            name:'title',
            type:'string'
        },
        {
            name:'description',
            type:'string'
        },
        {
            name:'date',
            type:'string'
        }
    ]

});