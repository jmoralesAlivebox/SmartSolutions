Ext.define('SmartSolutions.view.solutions.SolutionsView', {

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
        '<span class="x-solution-view-title">{title}</span>',
        '<span class="x-solution-view-paragraph">Description</span>',
        '<span class="x-solution-view-paragraph">{description}</span>',
        '<span class="x-solution-view-paragraph">{date}</span>',
        '</div>',
        '</tpl>'
    ],

    initComponent: function() {
        this.getSelectionModel().setSelectionMode(this.imageViewSelectionMode);
        this.callParent(arguments);
    }

});