Ext.define("SmartSolutions.view.solutions.CreateYourSolutionView", {
    extend:'Ext.container.Container',
    xtype:'createyoursolution',
    cls: 'create-solution-view',

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




