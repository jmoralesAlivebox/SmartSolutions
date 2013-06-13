Ext.define('Framework.core.ViewsManager', {

    singleton: true,

    scope: undefined,
    callback: undefined,

    enabled: false,
    headerPackage: undefined,
    viewsContainerPackage: undefined,
    footerPackage: undefined,

    views: undefined,
    viewModels: undefined,
    viewModelsByName: {},

    header: undefined,
    viewsContainer: undefined,
    footer: undefined,
    viewsIdIndex: 0,

    init: function(argConfig){
        Ext.apply(this,argConfig);
        this.viewsIdIndex = 0;
        this.viewModels = this.convertViewsToViewModels(this.views);
        this.validateViewsContainer();
    },

    convertViewsToViewModels: function(argViews){
        if( Ext.isEmpty(argViews) ){
            return null;
        }
        var tmpViewModels = [];
        for( var tmpIndex=0;tmpIndex < argViews.length;tmpIndex++ ){
            var tmpViewItem = argViews[tmpIndex];
            var tmpViewModel = this.convertViewToViewModel(tmpViewItem);
            tmpViewModels.push(tmpViewModel);
            this.viewModelsByName[tmpViewModel.get('name')] = tmpViewModel;
        }
        return tmpViewModels;
    },

    convertViewToViewModel: function(argView){
        if( Ext.isEmpty(argView) ){
            return null;
        }
        this.viewsIdIndex++;
        var tmpViewModel = Ext.create('Framework.core.ViewItem',argView);
        if( Ext.isEmpty(tmpViewModel.get('id')) || tmpViewModel.get('id') === 0 ){
            tmpViewModel.set('id',this.viewsIdIndex);
        }
        if( Ext.isEmpty(tmpViewModel.get('children')) ){
            return tmpViewModel;
        }
        tmpViewModel.set('children',this.convertViewsToViewModels(tmpViewModel.get('children')));
        return tmpViewModel;
    },

    getViewModelByName: function(argViewName){
        if( Ext.isEmpty(this.viewModels) || Ext.isEmpty(argViewName) ){
            return null;
        }
        return this.viewModelsByName[argViewName];
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
            viewModels: this.viewModels
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
        if( Ext.isEmpty(this.viewModels) ){
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
        var tmpDefaultPage = this.getDefaultPage(this.viewModels);
        this.showPage(tmpDefaultPage);
    },

    getDefaultPage: function(argViews){
        if( Ext.isEmpty(argViews) ){
            return null;
        }
        var tmpDefaultPage = null;
        for(var tmpIndex=0;tmpIndex < argViews.length;tmpIndex++){
            tmpDefaultPage = null;
            var tmpViewItem = argViews[tmpIndex];
            if( tmpViewItem.get('default') === true ){
                return tmpViewItem.get('name');
            }
            if( !Ext.isEmpty(tmpViewItem.get('children')) ){
                tmpDefaultPage = this.getDefaultPage(tmpViewItem.get('children'));
            }
            if( !Ext.isEmpty(tmpDefaultPage) ){
                return tmpDefaultPage;
            }
        }
        return null;
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

    validateTreeVisibility: function(argViewItem){
        if( Ext.isEmpty(argViewItem) || !this.isViewsContainerTreeRelated() ){
            return;
        }
        if( argViewItem.get('includeInTree') === true ){
            this.viewsContainer.showTree();
        }else{
            this.viewsContainer.hideTree();
        }
    },

    isViewsContainerTreeRelated: function(){
        if( Ext.isEmpty(this.viewsContainerPackage) ){
            return false;
        }
        if( this.viewsContainerPackage === 'Framework.ux.view.TreeViewsContainer' ||
            this.viewsContainerPackage === 'Framework.ux.view.TreeTabViewsContainer' ){
            return true;
        }
        return false;
    },

    showPage: function(argPageName){
        if( Ext.isEmpty(argPageName) ){
            return;
        }
        var tmpPageName = this.getPageNameWithoutQueryString(argPageName);
        var tmpCurrentHistoryPage = this.getPageNameWithoutQueryString(Ext.util.History.getToken());
        if(tmpCurrentHistoryPage === tmpPageName){
            this.addViewToViewsContainer(tmpPageName);
        }else{
            Ext.util.History.add(tmpPageName);
        }
    },

    onHistoryChange: function(argTokenPageName,argOptions){
        var tmpPageName = this.getPageNameWithoutQueryString(argTokenPageName);
        if( Ext.isEmpty(tmpPageName) ){
            return;
        }
        this.addViewToViewsContainer(tmpPageName);
    },

    getPageNameWithoutQueryString: function(argPageName){
        if( Ext.isEmpty(argPageName) ){
            return null;
        }
        var tmpQueryStringIndex = argPageName.indexOf('?');
        if( tmpQueryStringIndex < 0 ){
            return argPageName;
        }
        return argPageName.substring(0,argPageName.indexOf('?'));
    },

    addViewToViewsContainer: function(argViewName){
        var tmpViewModel = this.getViewModelByName(argViewName);
        if( !Framework.core.SecurityManager.containsPermissions(tmpViewModel.get('permissions')) ){
            var tmpErrorMessage = Ext.util.Format.format(Framework.core.Defaults.SIMPLE_ERROR_INVALID_PERMISSIONS_FOR_PAGE,argViewName);
            Framework.core.ErrorsManager.handleSimpleError(tmpErrorMessage);
            Framework.core.SecurityManager.logOutUser();
            this.showDefaultPage();
            return;
        }
        this.validateHeaderVisibility(tmpViewModel);
        this.validateFooterVisibility(tmpViewModel);
        this.validateTreeVisibility(tmpViewModel);
        this.viewsContainer.displayViewByViewModel(tmpViewModel);
    }

});
