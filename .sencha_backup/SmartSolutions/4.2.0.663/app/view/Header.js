Ext.define('SmartSolutions.view.Header', {
    extend: 'Ext.container.Container',
    xtype: 'smartsolutionsheader',
    layout: {
        type: 'column'
    },
    cls: 'main-header',
    initComponent: function () {
        this.items = [
            {
                xtype: 'container',
                cls: 'main-header-logo'
            },
            {
                xtype: 'container',
                cls: 'main-header-elements',
                layout: {
                    type: 'column'
                },
                items: [
                    {
                        xtype: 'container',
                        html: 'username'
                    },
                    {
                        xtype: 'image',
                        cls: 'main-header-icons',
                        src: 'resources/images/icons/Profile.png',
                        listeners: {
                            el: {
                                scope: this,
                                click: this.onUserProfile
                            }
                        }
                    },
                    {
                        xtype: 'image',
                        cls: 'main-header-icons',
                        src: 'resources/images/icons/logout.png',
                        listeners: {
                            el: {
                                scope: this,
                                click: this.onSignOut
                            }
                        }
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },

    onSignOut: function () {
        this.fireEvent('signOut');
    },
    onUserProfile: function () {
        this.fireEvent('userProfile');
    }

});