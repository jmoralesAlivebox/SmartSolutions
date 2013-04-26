Ext.define("SmartSolutions.view.solutions.YourSolutionsView", {

    extend:'Ext.container.Container',
    xtype:'yoursolutionsview',
    layout: 'column',
    cls: 'your-solutions-view',

    initComponent:function () {
        this.items = [
            {
                xtype: 'categorieslist',
                cls: 'x-list-view',
                width: 350
            },
            {
                xtype: 'container',
                columnWidth: 1,
                items: [
                    {
                        xtype: 'container',
                        cls: 'your-solutions-view-top',
                        layout: {
                            type: 'column'
                        },
                        items: [
                            {
                                xtype: 'container',
                                cls: 'your-solutions-view-txt',
                                html: 'Welcome to your Solutions!'
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
                    }
                    ,
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
                        store: 'Solutions'
                    }
                ]
            },
            {
                xtype: 'container',
                width: 350
            }
        ];
        this.callParent(arguments);
    },

    onNewSolution: function(){
        this.fireEvent('openNewSolutionView');
    }
});
