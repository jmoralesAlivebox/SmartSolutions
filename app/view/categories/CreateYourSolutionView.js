Ext.define("SmartSolutions.view.categories.CreateYourSolutionView", {
    extend:'Ext.container.Container',
    xtype:'createyoursolution',

    initComponent:function () {
        this.items = [
            {
                xtype:'newsolutionsave'
            },
            {
                xtype:'newsolutionview'
            }
        ];
        this.callParent(arguments);
    }
});




