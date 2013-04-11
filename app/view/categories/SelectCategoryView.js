Ext.define('SmartSolutions.view.categories.SelectCategoryView', {

    extend:'Ext.container.Container',
    xtype:'selectcategoryview',

    initComponent:function () {
        this.items = [
            {
                xtype:'container',
                cls: 'selectcategory-view',
                items: [
                    {
                        xtype: 'categoriesview',
                        itemId: 'categoriesview',
                        store: 'CategoryItems',
                        height: 600,
                        allowDeselect: true,
                        imageViewSelectionMode: SmartSolutions.defaults.Constants.IMAGE_VIEW_SELECTION_MODE_SIMPLE,
                        listeners: {
                            scope: this,
                            select: this.onCategorySelectionHandler
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    align: 'center'
                },
                cls: 'select-category-button-container',
                items: [
                    {
                        xtype: 'button',
                        cls: 'select-category-view-button',
                        overCls: 'hover-button',
                        text: 'My First Solution',
                        listeners: {
                            scope: this,
                            click: this.onNewSolution
                        }
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },

    onCategorySelectionHandler: function(argImageView, argRecord){
        this.fireEvent('categorySelected', argRecord.data);
    },

    onNewSolution: function(){
        this.fireEvent('openNewSolutionView');
    }

});