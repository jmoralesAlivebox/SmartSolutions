Ext.define('Framework.ux.container.TabContainer',{
	
	extend: 'Ext.container.Container',
	alias: 'widget.tabcontainer',

    requires: [
        'Ext.layout.container.Card'
    ],

    tabs: undefined,
    toolbar: undefined,
    cardContainer: undefined,
    selectedIndex: -1,
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
        var tmpToolbarItems = [];
        for( var tmpIndex=0;tmpIndex < this.items.length;tmpIndex++ ){
            var tmpTab = this.items[tmpIndex];
            var tmpTooltabItem = this.extractToolbarItemFromTab(tmpTab,tmpIndex);
            if( !Ext.isEmpty(tmpTooltabItem) ){
                tmpToolbarItems.push(tmpTooltabItem);
            }
        }
        return tmpToolbarItems;
    },

    extractToolbarItemFromTab: function(argTab,argTabIndex){
        if( Ext.isEmpty(argTab) ){
            return null;
        }
        var tmpToolbarItem = {
            text: argTab.title,
                enableToggle: true,
                toggleGroup: 'tabcontainertoolbar',
            tabIndex: argTabIndex,
                listeners: {
                    scope: this,
                    toggle: this.onTabSelected
                }
        };
        return tmpToolbarItem;
    },

    createCardContainer: function(){
        var tmpCardContainer = Ext.create('Ext.container.Container',{
            cls: this.cardContainerCls,
            layout: {
                type: 'card',
                deferredRender: true
            },
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
        this.setSelectedIndex(argButton.tabIndex);
        var tmpCardLayout = this.cardContainer.getLayout();
        this.fireEvent('tabchange',this.selectedIndex,tmpCardLayout.getActiveItem());
    },

    setTabsToDisableByIndexes: function(argIndexesArray, argIsDisabled){
        for( index in argIndexesArray ){
            var tmpButtonQuery = "button[tabIndex=" + argIndexesArray[index] + "]";
            var tmpTabButton = this.down(tmpButtonQuery);
            tmpTabButton.setDisabled(argIsDisabled);
        }
    },

    setTabsVisibilityByIndex: function(argIndexesArray, argIsVisible){
        var tmpButtonQuery = "button[tabIndex=" + argIndexesArray + "]";
        var tmpTabButton = this.down(tmpButtonQuery);
        tmpTabButton.setVisible(argIsVisible);
    },

    setSelectedIndex: function(argIndex,argReflectToolbar){
        if( Ext.isEmpty(argIndex) || argIndex < 0 || this.selectedIndex === argIndex ){
            return;
        }
        if( Ext.isEmpty(argReflectToolbar) ){
            argReflectToolbar = true;
        }
        var tmpCardLayout = this.cardContainer.getLayout();
        tmpCardLayout.setActiveItem(argIndex);
        this.selectedIndex = argIndex;
        Framework.core.ModelLocator.tabIndex = this.selectedIndex;
        if(argReflectToolbar){
            this.toggleSelectedToolbarButton();
        }
    },

    toggleSelectedToolbarButton: function(){
        if( Ext.isEmpty(this.selectedIndex) || this.selectedIndex < 0 ){
            return;
        }
        var tmpCurrentToolbarButton = this.toolbar.items.getAt(this.selectedIndex);
        if( Ext.isEmpty(tmpCurrentToolbarButton) || tmpCurrentToolbarButton.pressed === true ){
            return;
        }
        this.toolbar.items.getAt(this.selectedIndex).toggle();
    },

    addTab: function(argTab){
        this.unToggleSelectedToolbarButton();
        this.cardContainer.add(argTab);
        var tmpToolbarItem = this.extractToolbarItemFromTab(argTab,this.cardContainer.items.length - 1);
        tmpToolbarItem.pressed = true;
        this.toolbar.add(tmpToolbarItem);
        this.setSelectedIndex(this.cardContainer.items.length - 1,false);
    },

    unToggleSelectedToolbarButton: function(){
        if( this.selectedIndex < 0 || Ext.isEmpty(this.toolbar.items) ){
            return;
        }
        var tmpSelectedToolbarButton = this.toolbar.items.getAt(this.selectedIndex);
        tmpSelectedToolbarButton.toggle(false);
    }

});