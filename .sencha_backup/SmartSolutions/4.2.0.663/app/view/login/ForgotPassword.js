Ext.define("SmartSolutions.view.login.ForgotPassword", {

    extend: 'Ext.window.Window',
    alias: 'widget.forgotPassword',

    height: 200,
    width: 400,
    layout: {
        type: 'vbox',
        align: 'center',
        defaultMargins: {top:15}
    },
    initComponent: function(){
        this.items= [
            {
                xtype: 'label',
                text: 'Send me instructions!',
                style : 'font-size: 16px;'
            },
            {
                xtype: 'textfield',
                itemId: 'txtEmail',
                value: 'Email',
                width: 300
            },
            {
                xtype: 'button',
                itemId: 'btnSend',
                text: 'Send',
                listeners: {
                    scope: this,
                    click: this.onClickSend
                }
            }
        ];
        this.callParent(arguments);
    },

    onClickSend: function(){
        this.fireEvent('resetUser');
        this.close();
    }
});