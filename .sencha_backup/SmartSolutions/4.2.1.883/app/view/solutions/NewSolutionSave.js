Ext.define('SmartSolutions.view.solutions.NewSolutionSave', {
    extend:'Ext.container.Container',
    xtype:'newsolutionsave',
    border: '0 0 1 0',
    style: {
        borderColor: '#DADAD5',
        borderStyle: 'solid'
    },
    layout: {
        type: 'hbox'
    },
    cls: 'x-new-solution-save',
    initComponent:function () {
        this.items = [
            {
                xtype: 'label',
                text: 'Create your Solution',
                width: '88%'
            },
            {
                xtype: 'button',
                cls: 'new-solution-view-button',
                overCls: 'hover-button',
                text: 'Save',
                listeners: {
                    scope: this,
                    click: this.onClickSave
                }
            },
            {
                xtype: 'button',
                cls: 'new-solution-view-button',
                overCls: 'hover-button',
                text: 'Exit',
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