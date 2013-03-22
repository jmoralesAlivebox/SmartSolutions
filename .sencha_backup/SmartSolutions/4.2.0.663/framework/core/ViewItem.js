Ext.define('Framework.core.ViewItem', {

    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'package',
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
        }
    ]

});
