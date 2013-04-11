Ext.define('SmartSolutions.view.solutions.NewSolutionView', {

    extend:'Ext.container.Container',
    xtype:'newsolutionview',
    cls: 'x-new-solution-view',
    layout: {
        type: 'vbox'
    },

    initComponent:function () {
        this.items = [
            {
                xtype: 'label',
                text: 'Solution',
                cls: 'new-solution-view-txt'
            },
            {
                xtype: 'container',
                layout: {
                type: 'hbox'
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldCls: 'new-solution-view-forms',
                        itemId: 'txtTitle',
                        emptyText: 'Title',
                        allowBlank: false,
                        width: '4.4%'
                    },
                    {
                        xtype: 'button',
                        cls: 'new-solution-view-button',
                        overCls: 'hover-button',
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
                fieldCls: 'new-solution-view-forms',
                emptyText: 'Description',
                itemId: 'txtDescription',
                allowBlank: false,
                grow: true,
                width: '90%',
                growMin: '300',
                margin: {top:20}
            },
            {
                xtype: 'textfield',
                fieldCls: 'new-solution-view-forms',
                itemId: 'txtKeywords',
                emptyText: 'Keywords (use spaces between keywords)',
                width: 750,
                margin: {top:20},
                width: '90%'
            },
            {
                xtype: 'label',
                text: 'Select Category',
                cls: 'new-solution-view-txt',
                margin: {top:20}
            },
            {
                xtype: 'textfield',
                itemId: 'txtSearch',
                fieldCls: 'new-solution-view-forms',
                emptyText: 'search',
                width: '90%',
                margin: {top:10},
                listeners: {
                    scope: this,
                    change: this.onChangeSearch
                }
            },
            {
                xtype: 'categorieslist',
                cls: 'new-solution-view-list'
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


