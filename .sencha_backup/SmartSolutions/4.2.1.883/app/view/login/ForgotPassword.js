Ext.define("SmartSolutions.view.login.ForgotPassword", {

    extend: 'Ext.window.Window',
    alias: 'widget.forgotPassword',
    cls: 'forgot-password-view',
    height: 175,
    width: 400,
    header: false,
    resizable: false,
    frmae: true,
    layout: {
        type: 'vbox',
        defaultMargins: {top:15}
    },
    initComponent: function(){
        this.items= [
            {
                xtype: 'container',
                border: '0 0 1 0',
                style: {
                    borderColor: '#DADAD5',
                    borderStyle: 'solid'
                },
                width: '100%',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'label',
                        text: 'Send me instructions!',
                        cls: 'forgot-password-view-txt'
                    },
                    {
                        xtype: 'image',
                        src: 'resources/images/icons/ClosePopup.png',
                        listeners: {
                            el: {
                                scope: this,
                                click: this.onClosePopUp
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'textfield',
                fieldCls: 'forgot-password-view-forms',
                cls: 'forgot-password-view-forms-align',
                itemId: 'txtEmail',
                emptyText: 'Email'
            },
            {
                xtype: 'button',
                itemId: 'btnSend',
                cls: 'forgot-password-view-button',
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
    },

    onClosePopUp: function(){
        this.close();
    }
});