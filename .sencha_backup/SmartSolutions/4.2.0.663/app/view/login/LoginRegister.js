Ext.define('SmartSolutions.view.login.LoginRegister', {

    extend:'Ext.container.Container',
    xtype:'loginRegister',
    alias: 'widget.loginRegister',
    layout: {
        type: 'vbox',
        align:'center',
        defaultMargins: {top: 100, bottom: 5}
    },

    initComponent:function () {
        this.items = [
            {
                xtype: 'login'
            },
            {
                xtype: 'register',
                margin: {top:-50}

            }
        ];
        this.callParent(arguments);
    }
});