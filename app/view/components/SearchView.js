Ext.define('SmartSolutions.view.components.SearchView', {
    extend:'Ext.container.Container',
    alias: 'widget.search',
    layout: {
        type: 'hbox'
    },
    initComponent:function () {
        this.items = [
            {
                xtype: 'textfield',
                fieldCls: 'search-view-form',
                cls: 'search-view-form-margins',
                itemId: 'txtSearch',
                width: '60%',
                emptyText: 'Search',
                listeners: {
                    scope: this,
                    change: this.onChangeSearch
                }
            }

        ];
        this.callParent(arguments);
    },

    onChangeSearch: function(textfield, newValue){
        this.fireEvent('filterSearch', newValue);
    }
});