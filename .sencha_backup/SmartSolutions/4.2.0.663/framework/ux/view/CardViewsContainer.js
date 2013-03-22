Ext.define('Framework.ux.view.CardViewsContainer',{
	
	extend: 'Framework.ux.view.BaseViewsContainer',
	alias: 'widget.cardviewscontainer',

    viewInstancesByName: {},

    initComponent: function(){
        this.layout = 'card';
        this.callParent(arguments);
    },

    assignViewsWrapper: function(){
        this.viewsWrapper = this;
    },

    createViewFromViewItem: function(argViewItem){
        if( Ext.isEmpty(argViewItem) ){
            return null;
        }
        var tmpView = this.viewInstancesByName[argViewItem.get('name')];
        if( !Ext.isEmpty(tmpView) ){
            return tmpView;
        }
        tmpView = Ext.create(argViewItem.get('package'));
        this.viewInstancesByName[argViewItem.get('name')] = tmpView;
        return tmpView;
    },

    displayView: function(argView){
        if( Ext.isEmpty(argView) ){
            return;
        }
        this.viewsWrapper.add(argView);
        var tmpCardLayout = this.viewsWrapper.getLayout();
        tmpCardLayout.setActiveItem(argView);
        this.currentView = argView;
    }

});