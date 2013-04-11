Ext.define("SmartSolutions.view.solutions.YourSolutionsView", {

    extend:'Ext.container.Container',
    xtype:'yoursolutionsview',
    layout: 'column',
    cls: 'your-solutions-view',

    initComponent:function () {
        this.items = [
            {
                xtype: 'categorieslist',
                cls: 'x-list-view'
            },
            {
                xtype: 'container',
                width:'75%',
                margin: {left: '25%'},
                items: [
                    {
                        xtype: 'container',
                        cls: 'your-solutions-view-top',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'label',
                                cls: 'your-solutions-view-txt',
                                text: 'Welcome to your Solutions!',
                                width: '88%'
                            },
                            {
                                xtype: 'button',
                                text: 'Add Solution',
                                cls: 'your-solutions-view-button',
                                overCls: 'hover-button',
                                margin: {top:15},
                                listeners: {
                                    scope: this,
                                    click: this.onNewSolution
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'your-solutions-view-container-search',
                        border: '1 0 1 0',
                        style: {
                            borderColor: '#DADAD5',
                            borderStyle: 'solid'
                        },
                        items: [
                            {
                                xtype:'search'
                            }
                        ]
                    },
                    {
                        xtype: 'solutionsview',
                        store: 'Solutions',
                        width: 600,
                        height: 600
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },

    onNewSolution: function(){
        this.fireEvent('openNewSolutionView');
    }
});
