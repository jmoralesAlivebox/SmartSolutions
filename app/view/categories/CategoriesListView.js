Ext.define('SmartSolutions.view.categories.CategoriesListView', {
    extend:'Ext.container.Container',
    alias: 'widget.categorieslist',
    layout: {
        type: 'vbox'
    },
    initComponent:function () {
        this.items = [
            {
                xtype: 'label',
                text: 'Categories',
                style : 'font-size: 20px;',
                margin: {top:20}
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
                        emptyText: 'Category'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnAdd',
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