Ext.define('SmartSolutions.view.login.LoginRegister', {

    extend:'Ext.container.Container',
    xtype:'loginregister',
    alias: 'widget.loginRegister',
    cls: 'login-view',

    initComponent:function () {
        this.items = [
            {
                xtype: 'login'
            },
            {
                xtype: 'container',
                border: '1 0 0 0',
                style: {
                    borderColor: '#DADAD5',
                    borderStyle: 'solid'
                },
                cls: 'login-line-container'
            },
            {
                xtype: 'register'
            }
        ];
        this.callParent(arguments);
    }
});