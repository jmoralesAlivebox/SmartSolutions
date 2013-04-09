Ext.define('SmartSolutions.view.categories.SearchView', {
    extend:'Ext.container.Container',
    alias: 'widget.search',
    layout: {
        type: 'hbox'
    },
    cls: 'x-search-view',
    initComponent:function () {
        this.items = [
            {
                xtype: 'label',
                text: 'Browse',
                margin: {right:10, top:10}
            },
            {
                xtype: 'textfield',
                itemId: 'txtSearch',
                width: '60%',
                emptyText: 'search',
                listeners: {
                    scope: this,
                    change: this.onChangeSearch
                }
            },
            {
                xtype: 'button',
                text: 'Search',
                height: 25,
                width: 100,
                margin: {left:5, top:7}
            },
            {
                xtype: 'label',
                width: '20%'
            },
            {
                xtype: 'button',
                text: 'Add Solution',
                height: 25,
                width: 100,
                margin: {top:7},
                listeners: {
                    scope: this,
                    click: this.onNewSolution
                }
            }
        ];
        this.callParent(arguments);
    },

    onNewSolution: function(){
        this.fireEvent('openNewSolutionView');
    },

    onChangeSearch: function(textfield, newValue){
        this.fireEvent('filterSearch', newValue);
    }
});