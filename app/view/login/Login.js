Ext.define('SmartSolutions.view.login.Login', {

    extend:'Ext.container.Container',
    xtype:'login',
    alias: 'widget.login',
    layout: {
        type: 'vbox',
        align:'center',
        defaultMargins: {top: 10, bottom: 5}
    },

    initComponent:function () {
        this.items = [
            {
                xtype: 'label',
                text: 'SmartSolutions',
                style : 'font-size: 20px;'
            },
            {
                xtype: 'textfield',
                itemId: 'txtUsername',
                width: 184,
                emptyText: 'Username'
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
                        emptyText: 'Password'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnLogin',
                        text: 'Sign in',
                        margin: {left:10},
                        listeners: {
                            scope: this,
                            click: this.onLogin
                        }
                    }]
            },
            {
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },

                items: [
                    {
                        xtype: 'checkboxfield',
                        margin: {top:-4}
                    },
                    {
                        xtype: 'label',
                        text: 'Remember me  |',
                        margin: {left:6}
                    },
                    {
                        xtype: 'box',
                        margin: {left:10},
                        autoEl: {
                            tag: 'a',
                            href: '#',
                            html: 'Forgot password?'
                        },
                        listeners: {
                            scope: this,
                            render: function(c){
                                c.getEl().on('click', this.onForgot, this, {stopEvent: true});
                            }
                        }
                    }]
            }
        ];
        this.callParent(arguments);
    },

    onLogin: function(){
        this.fireEvent('validateLogin');
    },

    onForgot: function(){
        this.fireEvent('forgotPassword');
    }

});