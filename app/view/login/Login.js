Ext.define('SmartSolutions.view.login.Login', {

    extend:'Ext.container.Container',
    xtype:'loginform',
    alias: 'widget.login',
    cls: 'login-view-container',

    initComponent:function () {
        this.items = [
            {
                xtype: 'formcontainer',
                modelClassName: 'SmartSolutions.model.authentication.loginUser',
                itemId:'loginformcontainer',
                cls: 'login-view-elements',
                items: [
                    {
                        xtype: 'textfield',
                        fieldCls: 'login-view-forms',
                        cls: 'login-view-field',
                        itemId: 'txtUsername',
                        emptyText: 'Username',
                        name:'email'
                    },
                    {
                        xtype: 'textfield',
                        fieldCls: 'login-view-forms',
                        cls: 'login-view-short-field',
                        itemId: 'txtPassword',
                        emptyText: 'Password',
                        inputType:'password',
                        name:'password',
                        listeners:{
                            scope:this,
                            specialkey:this.onLoginEnter
                        }
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnLogin',
                        cls: 'login-view-buttons',
                        overCls: 'hover-button',
                        text: 'Sign in',
                        listeners: {
                            scope: this,
                            click: this.onLogin
                        }
                    }]
            },
            {
                xtype: 'container',
                cls: 'login-view-elements',
                layout: {
                    type: 'hbox'
                },

                items: [
                    {
                        xtype: 'checkboxfield',
                        cls: 'login-view-checkbox'
                    },
                    {
                        xtype: 'label',
                        cls: 'login-view-txt',
                        text: 'Remember me'
                    },
                    {
                        xtype: 'label',
                        cls: 'login-view-txt',
                        margin: {left:10},
                        text: '|'
                    },
                    {
                        xtype: 'box',
                        cls: 'login-view-txt',
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

    onLoginEnter: function(){
        this.fireEvent('login');
    },
    onLogin: function(){
        this.fireEvent('login');
    },

    onForgot: function(){
        this.fireEvent('forgotPassword');
    }

});