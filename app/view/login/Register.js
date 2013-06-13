Ext.define('SmartSolutions.view.login.Register', {

    extend:'Ext.container.Container',
    xtype:'registerform',
    alias: 'widget.register',
    cls: 'register-view-container',

    initComponent:function () {
        this.items = [
            {
                xtype: 'formcontainer',
                itemId:'registerformcontainer',
                modelClassName: 'SmartSolutions.model.authentication.loginUser',
                cls: 'login-view-elements',
                items: [
                    {
                        xtype: 'label',
                        text: 'New to SmartSolutions?',
                        cls: 'login-view-titles'
                    },
                    {
                        xtype: 'box',
                        cls: 'register-view-txt',
                        margin: {left:15},
                        autoEl: {
                            tag: 'a',
                            href: '#',
                            html: 'Sign up'
                        },
                        listeners: {
                            scope: this,
                            render: function(c){
                                c.getEl().on('click', this.onRegister, this, {stopEvent: true});
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        fieldCls: 'login-view-forms',
                        cls: 'login-view-field',
                        itemId: 'txtEmail',
                        emptyText: 'Email',
                        name:'email'
                    },
                    {
                        xtype: 'textfield',
                        fieldCls: 'login-view-forms',
                        cls: 'login-view-field',
                        itemId: 'txtPassword',
                        emptyText: 'Password',
                        inputType:'password',
                        name:'password'
                    }]
            }
        ];
        this.callParent(arguments);
    },

    onRegister: function(){
        this.fireEvent('signup');
    }

});