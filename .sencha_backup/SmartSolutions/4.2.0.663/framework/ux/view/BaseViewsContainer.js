Ext.define('Framework.ux.view.BaseViewsContainer',{

	extend: 'Ext.container.Container',
	alias: 'widget.baseviewscontainer',

    viewItems: undefined,
    viewItemsByName: undefined,
    viewsWrapper: undefined,
    currentView: undefined,

	initComponent: function(){
        this.assignViewsWrapper();
        this.generateViewItemsArrayAndViewItemsByNameMap(this.viewItems);
		this.callParent(arguments);
	},

    assignViewsWrapper: function(){
    },

    generateViewItemsArrayAndViewItemsByNameMap: function(argViewItems){
        if( Ext.isEmpty(argViewItems) ){
            return null;
        }
        this.viewItems = [];
        this.viewItemsByName = {};
        for(var tmpIndex = 0;tmpIndex < argViewItems.length;tmpIndex++){
            var tmpViewItem = argViewItems[tmpIndex];
            tmpViewItem = this.convertViewItemToModelView(tmpViewItem);
            this.viewItems.push(tmpViewItem);
            this.viewItemsByName[tmpViewItem.get('name')] = tmpViewItem;
        }
    },

    convertViewItemToModelView: function(argViewItem){
        if( Ext.isEmpty(argViewItem) ){
            return null;
        }
        if( argViewItem instanceof Framework.core.ViewItem){
            return argViewItem;
        }
        var tmpViewItem = Ext.create('Framework.core.ViewItem',argViewItem);
        return tmpViewItem;
    },

    displayViewByName: function(argViewName){
        if( Ext.isEmpty(this.viewItems) || Ext.isEmpty(argViewName) ){
            return;
        }
        var tmpViewItem = this.getViewItemByName(argViewName);
        var tmpView = this.createViewFromViewItem(tmpViewItem);
        this.displayView(tmpView);
    },

    getViewItemByName: function(argViewName){
        if( Ext.isEmpty(this.viewItems) || Ext.isEmpty(argViewName) ){
            return null;
        }
        return this.viewItemsByName[argViewName];
    },

    createViewFromViewItem: function(argViewItem){
        if( Ext.isEmpty(argViewItem) ){
            return null;
        }
        var tmpView = Ext.create(argViewItem.get('package'));
        return tmpView;
    },

    displayView: function(argView){
        if( Ext.isEmpty(argView) ){
            return;
        }
        this.removeCurrentViewFromWrapper();
        this.viewsWrapper.add(argView);
        this.currentView = argView;
    },

    removeCurrentViewFromWrapper: function(){
        if( Ext.isEmpty(this.currentView) ){
            return;
        }
        this.remove(this.currentView,true);
    }
	
});