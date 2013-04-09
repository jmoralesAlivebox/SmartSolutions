Ext.define('SmartSolutions.view.Header', {
    extend:'Ext.container.Container',
    xtype:'smartsolutionsheader',
    layout: {
        type: 'hbox'
    },
    cls: 'main-header',
    initComponent:function () {
        this.items = [
        {
            xtype: 'label',
            text: 'SmartSolutions',
            width: '85%'
        },
        {
            xtype: 'label',
            text: 'Username'
        },
        {
            xtype: 'image',
            src: 'resources/images/icons/signOut.png',
            height: 45,
            width: 40,
            margin: {left:20},
            listeners: {
                el: {
                    scope: this,
                    click: this.onSignOut
                }
            }
        }
        ];
        this.callParent(arguments);
    },

    onSignOut: function(){
        this.fireEvent('signOut');
    }

});