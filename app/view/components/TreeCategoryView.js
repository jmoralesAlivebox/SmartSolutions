Ext.define('SmartSolutions.view.components.TreeCategoryView', {
    extend: 'Ext.tree.Panel',

    alias: 'widget.treecategory',

    requires: [
        'Ext.tree.*',
        'Ext.data.*'
    ],
    xtype: 'treecategory',


    height: 400,
    width: 350,
    title: 'Categories',
    useArrows: true,

    initComponent: function() {
        Ext.apply(this, {
            store: 'TreeCategories',
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    containerScroll: true
                }
            },
            tbar: [{
                text: 'Expand All',
                scope: this,
                handler: this.onExpandAllClick
            }, {
                text: 'Collapse All',
                scope: this,
                handler: this.onCollapseAllClick
            }]
        });
        this.callParent();
    },

    onExpandAllClick: function(){
        var me = this,
            toolbar = me.down('toolbar');

        me.getEl().mask('Expanding tree...');
        toolbar.disable();

        this.expandAll(function() {
            me.getEl().unmask();
            toolbar.enable();
        });
    },

    onCollapseAllClick: function(){
        var toolbar = this.down('toolbar');

        toolbar.disable();
        this.collapseAll(function() {
            toolbar.enable();
        });
    }
});