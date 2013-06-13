Ext.define('Framework.ux.view.TabViewsContainer',{
	
	extend: 'Framework.ux.view.BaseViewsContainer',
	alias: 'widget.tabviewscontainer',

    tabContainer: undefined,

    assignViewsWrapper: function () {
        this.viewsWrapper = this.tabContainer;
    },

    getItems: function(){
        this.tabContainer = this.getTabContainer();
        return [
            this.tabContainer
        ];
    },

    getTabContainer: function(){
        var tmpTabContainerItems = this.getTabContainerItemsBasedOnViewModels();
        var tmpTabContainer = Ext.create('Framework.ux.container.TabContainer',{
            items: tmpTabContainerItems
        });
        tmpTabContainer.addListener('tabchange',this.onTabChange);
        return tmpTabContainer;
    },

    onTabChange: function(argTabIndex,argTab){
        if( Ext.isEmpty(argTab) ){
            return;
        }
        Ext.util.History.add(argTab.itemId);
    },

    getTabContainerItemsBasedOnViewModels: function(){
        if( Ext.isEmpty(this.viewModels) ){
            return null;
        }
        var tmpTabContainerItems = [];
        var tmpIndex = 0,tmpLength = this.viewModels.length;
        for(;tmpIndex < tmpLength;tmpIndex++){
            var tmpViewModel = this.viewModels[tmpIndex];
            var tmpTabContainerItem = this.getTabContainerItemBasedOnViewModel(tmpViewModel);
            if( !Ext.isEmpty(tmpTabContainerItem) ){
                tmpTabContainerItems.push(tmpTabContainerItem);
            }
        }
        return tmpTabContainerItems;
    },

    getTabContainerItemBasedOnViewModel: function(argViewModel){
        if( Ext.isEmpty(argViewModel) ){
            return null;
        }
        var tmpTabContainerItemConfig = {
            title: argViewModel.get('label'),
            itemId: argViewModel.get('name')
        };
        if( !Ext.isEmpty(argViewModel.get('xtype')) ){
            tmpTabContainerItemConfig.xtype = argViewModel.get('xtype');
            return tmpTabContainerItemConfig;
        }
        if( !Ext.isEmpty(argViewModel.get('package')) ){
            var tmpTabContainerItemInstance = Ext.create(argViewModel.get('package'),tmpTabContainerItemConfig);
            return tmpTabContainerItemInstance;
        }
        return null;
    },

    displayViewByViewModel: function(argViewModel){
        if( Ext.isEmpty(argViewModel) || Ext.isEmpty(this.viewModels) ){
            return;
        }
        var tmpViewIndex = this.viewModels.indexOf(argViewModel);
        this.tabContainer.setSelectedIndex(tmpViewIndex);
    },

    addView: function(argViewModel){
        if( Ext.isEmpty(argViewModel) ){
            return;
        }
        if( Ext.isEmpty(this.viewModels) ){
            this.viewModels = [];
        }
        var tmpViewIndex = this.viewModels.indexOf(argViewModel);
        if( tmpViewIndex > -1 ){
            this.displayViewByViewModel(argViewModel);
            return;
        }
        this.viewModels.push(argViewModel);
        var tmpTabItem = this.getTabContainerItemBasedOnViewModel(argViewModel);
        this.tabContainer.addTab(tmpTabItem);
    }

});