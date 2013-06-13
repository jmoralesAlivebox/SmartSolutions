Ext.define('SmartSolutions.store.Solutions', {

    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'SmartSolutions.model.Solution',
    remoteFilter: false,

    proxy: {
        type: 'ajax',
        url: 'resources/data/solutions.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});