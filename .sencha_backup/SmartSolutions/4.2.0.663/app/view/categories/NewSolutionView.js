Ext.define('SmartSolutions.view.categories.NewSolutionView', {

    extend:'Ext.container.Container',
    xtype:'newsolutionview',


    initComponent:function () {
        this.items = [
            {
                xtype: 'label',
                text: 'Select your main categories!',
                style : 'font-size: 30px;'
            },
            {
                xtype: 'categoriesview',
                itemId: 'categoriesview',
                store: 'CategoryItems',
                imageViewSelectionMode: SmartSolutions.defaults.Constants.IMAGE_VIEW_SELECTION_MODE_SINGLE,
                listeners: {
                    scope: this,
                    select: this.onCategorySelectionHandler
                }
            },
            {
                xtype: 'button',
                text: 'My First Solution',
                height: 100,
                width: 600,
                style: 'font-size: 80px;'
            }
        ];
        this.callParent(arguments);
    },

    onCategorySelectionHandler: function(argImageView, argRecord){
        this.fireEvent('categorySelected', argRecord.data);
    }

});