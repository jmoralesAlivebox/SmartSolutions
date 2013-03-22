Ext.define('SmartSolutions.view.categories.CategoriesView', {

    extend: 'Ext.view.View',
    alias : 'widget.categoriesview',
    requires: ['Ext.data.Store'],
    trackOver: true,
    itemSelector: 'div.thumb-wrap',
    width: 600,
    tpl: [
        '<tpl for=".">',
        '<div class="thumb-wrap">',
        '<div class="thumb">',
        '<img id="{id}" src="{imageSource}" title="{name}">',
        '</div>',
        '<span>{name}</span>',
        '</div>',
        '</tpl>'
    ]

});


