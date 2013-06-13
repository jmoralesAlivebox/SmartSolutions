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

    createViewFromViewModel: function(argViewModel){
        if( Ext.isEmpty(argViewModel) ){
            return null;
        }
        var tmpView = this.viewInstancesByName[argViewModel.get('name')];
        if( !Ext.isEmpty(tmpView) ){
            return tmpView;
        }
        if( !Ext.isEmpty(argViewModel.get('package')) ){
        tmpView = Ext.create(argViewModel.get('package'));
        }else if( !Ext.isEmpty(argViewModel.get('xtype')) ){
            tmpView = Ext.createByAlias("widget." + argViewModel.get('xtype'));
        }
        this.viewInstancesByName[argViewModel.get('name')] = tmpView;
        return tmpView;
    },

    displayView: function(argView){
        if( Ext.isEmpty(argView) ){
            return;
        }
        if( Ext.isEmpty(argView.addedToWrapper) || argView.addedToWrapper === false ){
            this.viewsWrapper.add(argView);
            argView.addedToWrapper = true;
        }
        var tmpCardLayout = this.viewsWrapper.getLayout();
        tmpCardLayout.setActiveItem(argView);
        this.currentView = argView;
    }

});