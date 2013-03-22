Ext.define('Framework.ux.view.TabViewsContainer',{
	
	extend: 'Framework.ux.view.BaseViewsContainer',
	alias: 'widget.tabviewscontainer',

    toolbar: undefined,
    viewsContainer: undefined,
    keepViewsInMemory: true,

    initComponent: function(){
        this.toolbar = this.createToolbar();
        this.viewsContainer = this.createViewsContainer();
        this.items = [
            this.toolbar,
            this.viewsContainer
        ];
        this.callParent(arguments);
    },

    createToolbar: function(){
        var tmpToolbar = Ext.create('Ext.toolbar.Toolbar',{
            defaults: {
                allowDepress: false
            }
        });
        return tmpToolbar;
    },

    createViewsContainer: function(){
        var tmpViewsContainer = undefined;
        if( this.keepViewsInMemory ){
            tmpViewsContainer = Ext.create('Framework.ux.view.CardViewsContainer',{
                viewItems: this.viewItems
            });
        }else{
            tmpViewsContainer = Ext.create('Framework.ux.view.SimpleViewsContainer',{
                viewItems: this.viewItems
            });
        }
        return tmpViewsContainer;
    },

    assignViewsWrapper: function(){
        this.viewsWrapper = this.viewsContainer;
    },

    generateViewItemsArrayAndViewItemsByNameMap: function(argViewItems){
        this.callParent(arguments);
        this.addToolbarItems();
    },

    addToolbarItems: function(){
        if( Ext.isEmpty(this.viewItems) ){
            return;
        }
        for( var tmpIndex=0;tmpIndex < this.viewItems.length;tmpIndex++ ){
            var tmpViewItem = this.viewItems[tmpIndex];
            var tmpToolbarButton = {
                text: tmpViewItem.get('name'),
                enableToggle: true,
                toggleGroup: 'tabviewscontainertoolbar',
                tabIndex: tmpIndex
//                ,
//                listeners: {
//                    scope: this,
//                    toggle: this.onTabSelected
//                }
            };
            this.toolbar.add(tmpToolbarButton);
        }
    },

    createViewFromViewItem: function(argViewItem){
        return this.viewsWrapper.createViewFromViewItem(argViewItem);
    },

    displayView: function(argView){
        this.viewsWrapper.displayView(argView);
    }

});