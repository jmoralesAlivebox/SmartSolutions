Ext.define('SmartSolutions.view.categories.CategoriesView', {

    extend: 'Ext.view.View',
    alias : 'widget.categoriesview',
    requires: ['Ext.data.Store'],
    imageViewSelectionMode: undefined,
    allowDeselect: false,
    trackOver: true,
    itemSelector: 'div.thumb-wrap',
    cls: 'x-image-view',
    autoScroll: true,
    overItemCls: 'x-item-over',

    tpl: [
        '<tpl for=".">',
        '<div class="thumb-wrap">',
        '<div class="thumb">',
        '<img id="{id}" src="{imageSource}" title="{name}">',
        '</div>',
        '<span>{name}</span>',
        '</div>',
        '</tpl>'
    ],

    initComponent: function() {
        this.getSelectionModel().setSelectionMode(this.imageViewSelectionMode);
        this.callParent(arguments);
    }

});


