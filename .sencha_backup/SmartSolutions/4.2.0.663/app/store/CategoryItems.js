Ext.define('SmartSolutions.store.CategoryItems', {

    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'SmartSolutions.model.ImageItem',

    proxy: {
        type: 'ajax',
        url: 'resources/data/categoryItems.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});