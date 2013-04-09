Ext.define('SmartSolutions.view.categories.NewSolutionSave', {
    extend:'Ext.container.Container',
    xtype:'newsolutionsave',
    layout: {
        type: 'hbox'
    },
    cls: 'x-new-solution-save',
    initComponent:function () {
        this.items = [
            {
                xtype: 'label',
                text: 'Create your Solution',
                width: '87%'
            },
            {
                xtype: 'button',
                text: 'Save',
                height: 30,
                width: 90,
                listeners: {
                    scope: this,
                    click: this.onClickSave
                }
            },
            {
                xtype: 'button',
                text: 'Exit',
                margin: {left:10},
                height: 30,
                width: 90,
                listeners: {
                    scope: this,
                    click: this.onClickExit
                }
            }
        ];
        this.callParent(arguments);
    },

    onClickSave: function(){
        this.fireEvent('saveSolution');
    },

    onClickExit: function(){
        this.fireEvent('returnToSolutions');
    }
});