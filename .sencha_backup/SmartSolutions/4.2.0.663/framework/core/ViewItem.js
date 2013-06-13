Ext.define('Framework.core.ViewItem', {

    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'label',
            type: 'string'
        },
        {
            name: 'package',
            type: 'string'
        },
        {
            name: 'xtype',
            type: 'string'
        },
        {
            name: 'default',
            type: 'boolean',
            defaultValue: false
        },
        {
            name: 'permissions'
        },
        {
            name: 'hideHeader',
            type: 'boolean',
            defaultValue: false
        },
        {
            name: 'hideFooter',
            type: 'boolean',
            defaultValue: false
        },
        {
            name: 'includeInTree',
            type: 'boolean',
            defaultValue: true
        },
        {
            name: 'children',
            defaultValue: undefined
        }
    ]

});
