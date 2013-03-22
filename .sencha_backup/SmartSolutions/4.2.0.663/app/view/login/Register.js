Ext.define('SmartSolutions.view.login.Register', {

    extend:'Ext.container.Container',
    xtype:'register',
    alias: 'widget.register',
    layout: {
        type: 'vbox',
        align:'center',
        defaultMargins: {top: 10, bottom: 5}
    },

    initComponent:function () {
        this.items = [
            {
                xtype: 'label',
                text: 'New to SmartSolutions? Sign up',
                style : 'font-size: 16px;'
            },
            {
                xtype: 'textfield',
                itemId: 'txtEmail',
                width: 184,
                value: 'Email'
            },
            {
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },

                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'txtPassword',
                        value: 'Password'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnRegister',
                        text: 'Sign up',
                        margin: {left:10},
                        listeners: {
                            scope: this,
                            click: this.onRegister
                        }
                    }]
            }
        ];
        this.callParent(arguments);
    },

    onRegister: function(){
        this.fireEvent('createUser');
    }

});