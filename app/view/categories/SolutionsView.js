Ext.define('SmartSolutions.view.categories.SolutionsView', {

    extend: 'Ext.view.View',
    alias : 'widget.solutionsview',
    requires: ['Ext.data.Store'],
    imageViewSelectionMode: undefined,
    allowDeselect: false,
    trackOver: true,
    itemSelector: 'div.thumb-wrap',
    cls: 'x-solution-view',
    autoScroll: true,
    overItemCls: 'x-item-over',

    tpl: [
        '<tpl for=".">',
        '<div class="thumb-wrap">',
        '<span>{title}</span>',
        '<span>Description</span>',
        '<span>{description}</span>',
        '<span class="x-solution-view-date">{date}</span>',
        '</div>',
        '</tpl>'
    ],

    initComponent: function() {
        this.getSelectionModel().setSelectionMode(this.imageViewSelectionMode);
        this.callParent(arguments);
    }

});