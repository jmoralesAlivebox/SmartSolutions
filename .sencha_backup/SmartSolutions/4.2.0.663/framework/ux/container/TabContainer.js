Ext.define('Framework.ux.container.TabContainer',{
	
	extend: 'Ext.container.Container',
	alias: 'widget.tabcontainer',

    requires: [
        'Ext.layout.container.Card'
    ],

    tabs: undefined,
    toolbar: undefined,
    cardContainer: undefined,
    selectedIndex: 0,
    toolbarCls: undefined,
    toolbarButtonsCls: undefined,
    toolbarButtonsPressedCls: undefined,
    cardContainerCls: undefined,

    initComponent: function(){
        this.toolbar = this.createToolbar();
        this.cardContainer = this.createCardContainer();
        this.items = [
            this.toolbar,
            this.cardContainer
        ];
        this.callParent(arguments);
    },

    createToolbar: function(){
        var tmpToolbarItems = this.extractToolbarItemsFromTabs();
        var tmpToolbar = Ext.create('Ext.toolbar.Toolbar',{
            cls: this.toolbarCls,
            defaults: {
                allowDepress: false
            },
            items: tmpToolbarItems
        });
        return tmpToolbar;
    },

    extractToolbarItemsFromTabs: function(){
        if( Ext.isEmpty(this.items) ){
            return [];
        }
        var tmpIsFirstItem = true;
        var tmpToolbarItems = [];
        for( var tmpIndex=0;tmpIndex < this.items.length;tmpIndex++ ){
            var tmpTab = this.items[tmpIndex];
            tmpToolbarItems.push({
                text: tmpTab.title,
                enableToggle: true,
                toggleGroup: 'tabcontainertoolbar',
                pressed: tmpIsFirstItem,
                tabIndex: tmpIndex,
                listeners: {
                    scope: this,
                    toggle: this.onTabSelected
                }
            });
            tmpIsFirstItem = false;
        }
        return tmpToolbarItems;
    },

    createCardContainer: function(){
        var tmpCardContainer = Ext.create('Ext.container.Container',{
            cls: this.cardContainerCls,
            layout: 'card',
            defaults: {
                xtype: 'container'
            },
            autoScroll: true,
            items: this.items
        });
        return tmpCardContainer;
    },

    onTabSelected: function(argButton,argPressed){
        if( !argPressed || argButton.tabIndex === this.selectedIndex ){
            return;
        }
        var tmpCardLayout = this.cardContainer.getLayout();
        tmpCardLayout.setActiveItem(argButton.tabIndex);
        this.selectedIndex = argButton.tabIndex;
        this.fireEvent('tabchange',this.selectedIndex,tmpCardLayout.getActiveItem());
    },

    setTabsToDisableByIndexes: function(argIndexesArray, argIsDisabled){
        for( index in argIndexesArray ){
            var tmpButtonQuery = "button[tabIndex=" + argIndexesArray[index] + "]";
            var tmpTabButton = this.down(tmpButtonQuery);
            tmpTabButton.setDisabled(argIsDisabled);
        }
    }

});