Ext.define('SmartSolutions.view.categories.CategoriesListView', {
    extend:'Ext.container.Container',
    alias: 'widget.categorieslist',
    layout: {
        type: 'vbox'
    },
    initComponent:function () {
        this.items = [
            {
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },
                items:[
                    {
                        xtype: 'image',
                        src: 'resources/images/icons/categories.png',
                        margin: {right: 10, top: 15}
                    },
                    {
                        xtype: 'label',
                        text: 'All Categories',
                        cls: 'x-list-view-txt'
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                itemId: 'gridCategories',
                store: 'Categories',
                columns: [
                    {
                        dataIndex: 'name'
                    }
                ]
            },
            {
                xtype: 'button',
                cls: 'x-list-view-button',
                overCls: 'hover-button',
                text: 'Add Category',
                margin: {top:15},
                listeners: {
                    scope: this,
                    click: this.onNewCategory
                }
            },
            {
                xtype: 'container',
                itemId: 'addContainer',
                hidden: true,
                margin: {top:10},
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'txtCategoryName',
                        fieldCls: 'x-list-view-forms',
                        emptyText: 'Category'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnAdd',
                        cls: 'x-list-view-button',
                        text: 'Add',
                        listeners: {
                            scope: this,
                            click: this.onClickAdd
                        }
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },

    onNewCategory: function(){
        this.fireEvent('showAddContainer');
    },

    onClickAdd: function(){
        this.fireEvent('addCategory');
    }
});