Ext.define("SmartSolutions.view.categories.YourSolutionsView", {

    extend:'Ext.container.Container',
    xtype:'yoursolutionsview',

    initComponent:function () {
        this.items = [
            {
                xtype:'search'
            },
            {
                xtype: 'container',
                layout: 'column',
                items: [
                    {
                        xtype: 'categorieslist',
                        cls: 'x-list-view'
                    },
                    {
                        xtype: 'container',
                        items: [
                            {
                                xtype: 'label',
                                text: 'Welcome to your Solutions!',
                                style : 'font-size: 30px;'
                            },
                            {
                                xtype: 'solutionsview',
                                store: 'Solutions',
                                width: 600,
                                height: 600
                            }
                        ]
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
