Ext.define('Framework.ux.view.BaseViewsContainer',{

	extend: 'Ext.container.Container',
	alias: 'widget.baseviewscontainer',

    viewModels: undefined,
    viewsWrapper: undefined,
    currentView: undefined,

	initComponent: function(){
        this.items = this.getItems();
        this.assignViewsWrapper();
		this.callParent(arguments);
	},

    assignViewsWrapper: function(){
    },

    getItems: function(){
        return null;
    },

    createViewFromViewModel: function(argViewItem){
        if( Ext.isEmpty(argViewItem) ){
            return null;
        }
        var tmpView = null;
        if( !Ext.isEmpty(argViewItem.get('package')) ){
            tmpView = Ext.create(argViewItem.get('package'));
        }else if( !Ext.isEmpty(argViewItem.get('xtype')) ){
            tmpView = Ext.createByAlias("widget." + argViewItem.get('xtype'));
        }
        return tmpView;
    },

    displayViewByViewModel: function(argViewModel){
        var tmpView = this.createViewFromViewModel(argViewModel);
        if( Ext.isEmpty(tmpView) ){
            return;
        }
        this.displayView(tmpView);
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
        this.viewsWrapper.remove(this.currentView,true);
    }
	
});