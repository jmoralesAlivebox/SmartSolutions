Ext.define('Framework.core.ViewsManager', {

    singleton: true,

    scope: undefined,
    callback: undefined,

    enabled: false,
    headerPackage: undefined,
    viewsContainerPackage: undefined,
    footerPackage: undefined,
    views: undefined,

    header: undefined,
    viewsContainer: undefined,
    footer: undefined,

    init: function(argConfig){
        Ext.apply(this,argConfig);
        this.validateViewsContainer();
    },

    validateViewsContainer: function(){
        if( Ext.isEmpty(this.viewsContainerPackage) ){
            Framework.core.ErrorsManager.handleFatalError(Framework.core.Defaults.FATAL_ERROR_VIEWS_CONTAINER_NOT_SPECIFIED);
            return;
        }
        if( Ext.isEmpty(this.viewsContainerPackage) || Ext.isEmpty(Ext.ClassManager.get(this.viewsContainerPackage)) ){
            var tmpErrorMessage = Ext.util.Format.format(Framework.core.Defaults.FATAL_ERROR_INVALID_VIEWS_CONTAINER,this.viewsContainerPackage);
            Framework.core.ErrorsManager.handleFatalError(tmpErrorMessage);
            return;
        }
        this.createViewPortItems();
    },

    createViewPortItems: function(){
        var tmpItems = [];
        this.header = this.createHeader();
        if( !Ext.isEmpty(this.header) ){
            tmpItems.push(this.header);
        }
        this.viewsContainer = this.createViewsContainer();
        if( !Ext.isEmpty(this.viewsContainer) ){
            tmpItems.push(this.viewsContainer);
        }
        this.footer = this.createFooter();
        if( !Ext.isEmpty(this.footer) ){
            tmpItems.push(this.footer);
        }
        this.createViewPort(tmpItems);
    },

    createHeader: function(){
        if( Ext.isEmpty(this.headerPackage) || Ext.isEmpty(Ext.ClassManager.get(this.headerPackage)) ){
            return null;
        }
        var tmpHeader = Ext.create(this.headerPackage);
        tmpHeader.hidden = true;
        return tmpHeader;
    },

    createViewsContainer: function(){
        var tmpViewsContainer = Ext.create(this.viewsContainerPackage,{
            viewItems: this.views
        });
        tmpViewsContainer.autoScroll = true;
        return tmpViewsContainer;
    },

    createFooter: function(){
        if( Ext.isEmpty(this.footerPackage) || Ext.isEmpty(Ext.ClassManager.get(this.footerPackage)) ){
            return null;
        }
        var tmpFooter = Ext.create(this.footerPackage);
        tmpFooter.hidden = true;
        return tmpFooter;
    },

    createViewPort: function(argItems){
        Ext.create('Ext.container.Viewport', {
            listeners: {
                scope: this,
                beforerender: this.onViewPortBeforeRender
            },
            cls: 'main-container',
            items: argItems
        });
    },

    onViewPortBeforeRender: function(){
        this.addListeners();
        this.showDefaultPageOrCurrentHistoryPage();
        Framework.util.ObjectUtil.runCallback(this.callback,this.scope);
    },

    addListeners: function(){
        Framework.core.EventBus.addListener(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE,this.showPage,this);
        Ext.util.History.addListener('change',this.onHistoryChange,this);
    },

    showDefaultPageOrCurrentHistoryPage: function(){
        var tmpViewItems = this.viewsContainer.viewItems;
        if( Ext.isEmpty(tmpViewItems) ){
            return;
        }
        var tmpCurrentHistoryPage = Ext.util.History.getToken();
        if( !Ext.isEmpty(tmpCurrentHistoryPage) ){
            this.showPage(tmpCurrentHistoryPage);
            return;
        }
        this.showDefaultPage();
    },

    showDefaultPage: function(){
        var tmpViewItems = this.viewsContainer.viewItems;
        for(var tmpIndex=0;tmpIndex < tmpViewItems.length;tmpIndex++){
            var tmpViewItem = tmpViewItems[tmpIndex];
            if( tmpViewItem.get('default') === true ){
                this.showPage(tmpViewItem.get('name'));
                break;
            }
        }
    },

    showPage: function(argPageName){
        if( Ext.isEmpty(argPageName) ){
            return;
        }
        var tmpCurrentHistoryPage = Ext.util.History.getToken();
        if(tmpCurrentHistoryPage === argPageName){
            this.addViewToViewsContainer(argPageName);
        }else{
            Ext.util.History.add(argPageName);
        }
    },

    validateHeaderVisibility: function(argViewItem){
        if( Ext.isEmpty(argViewItem) || Ext.isEmpty(this.header) ){
            return;
        }
        if( argViewItem.get('hideHeader') === true ){
            this.header.setVisible(false);
        }else{
            this.header.setVisible(true);
        }
    },

    validateFooterVisibility: function(argViewItem){
        if( Ext.isEmpty(argViewItem) || Ext.isEmpty(this.footer) ){
            return;
        }
        if( argViewItem.get('hideFooter') === true ){
            this.footer.setVisible(false);
        }else{
            this.footer.setVisible(true);
        }
    },

    onHistoryChange: function(argTokenPageName,argOptions){
        if( Ext.isEmpty(argTokenPageName) ){
            return;
        }
        this.addViewToViewsContainer(argTokenPageName);
    },

    addViewToViewsContainer: function(argViewName){
        var tmpViewItem = this.viewsContainer.getViewItemByName(argViewName);
        if( !Framework.core.SecurityManager.containsPermissions(tmpViewItem.get('permissions')) ){
            var tmpErrorMessage = Ext.util.Format.format(Framework.core.Defaults.SIMPLE_ERROR_INVALID_PERMISSIONS_FOR_PAGE,argViewName);
            Framework.core.ErrorsManager.handleSimpleError(tmpErrorMessage);
            Framework.core.SecurityManager.logOutUser();
            this.showDefaultPage();
            return;
        }
        this.viewsContainer.displayViewByName(argViewName);
        var tmpViewItem = this.viewsContainer.getViewItemByName(argViewName);
        this.validateHeaderVisibility(tmpViewItem);
        this.validateFooterVisibility(tmpViewItem);
    }

});
