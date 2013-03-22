Ext.define('SmartSolutions.model.ImageItem', {

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
        },
        {
            name:'imageSource',
            type:'string'
        }
    ]


});