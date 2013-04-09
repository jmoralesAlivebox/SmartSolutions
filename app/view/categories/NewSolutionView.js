Ext.define('SmartSolutions.view.categories.NewSolutionView', {

    extend:'Ext.container.Container',
    xtype:'newsolutionview',
    cls: 'x-new-solution-view',
    layout: {
        type: 'vbox'
    },

    initComponent:function () {
        this.items = [
            {
                xtype: 'container',
                layout: {
                type: 'hbox'
                },
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'txtTitle',
                        emptyText: 'Title',
                        allowBlank: false,
                        width: '8.9%'
                    },
                    {
                        xtype: 'button',
                        text: 'Image',
                        margin: {left:15},
                        listeners: {
                            scope: this,
                            click: this.onAddImage
                        }
                    }
                ]
            },
            {
                xtype: 'textarea',
                emptyText: 'Description',
                itemId: 'txtDescription',
                allowBlank: false,
                grow: true,
                width: '98%',
                growMin: '300',
                margin: {top:20}
            },
            {
                xtype: 'textfield',
                itemId: 'txtKeywords',
                emptyText: 'Keywords (use spaces between keywords)',
                width: 750,
                margin: {top:20},
                width: '98%'
            },
            {
                xtype: 'label',
                text: 'Select Category',
                style : 'font-size: 20px;',
                margin: {top:20}
            },
            {
                xtype: 'container',
                margin: {top:10},
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'txtSearch',
                        width: '8.9%',
                        emptyText: 'search',
                        listeners: {
                            scope: this,
                            change: this.onChangeSearch
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Search',
                        margin: {left:15}
                    }
                ]
            },
            {
                xtype: 'categorieslist'
            }
        ];
        this.callParent(arguments);
    },

    onAddImage: function(){
        this.fireEvent('addImage');
    },

    onChangeSearch: function(textfield, newValue){
        this.fireEvent('filterSearch', newValue);
    }
});


