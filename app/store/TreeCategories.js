Ext.define('SmartSolutions.store.TreeCategories', {

    extend: 'Ext.data.TreeStore',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'resources/data/categories.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    root: {
        text: 'Categories',
        id: 'src',
        expanded: true
    }

});