Ext.define('Framework.ux.view.TreeTabViewsContainer', {

    extend: 'Framework.ux.view.TreeViewsContainer',

    alias: 'widget.treetabviewscontainer',
    cls: 'treetab-views-container',

    createContentArea: function(){
        var tmpContentArea = Ext.create('Framework.ux.view.TabViewsContainer',{
            columnWidth: 0.80
        });
        return tmpContentArea;
    },

    displayViewByViewModel: function(argViewModel){
        this.contentArea.addView(argViewModel);
    }

});