Ext.define('Framework.ux.view.TreeViewsContainer', {

    extend: 'Framework.ux.view.BaseViewsContainer',

    alias: 'widget.treeviewscontainer',
    cls: 'tree-views-container',
    layout: 'column',

    treePanel: undefined,
    contentArea: undefined,
    selectedViewId: undefined,

    assignViewsWrapper: function () {
        this.viewsWrapper = this.contentArea;
    },

    displayViewByViewModel: function(argViewModel){
        this.contentArea.displayViewByViewModel(argViewModel);
        this.selectedViewId = argViewModel.get('id');
        this.markSelectedViewInTree();
    },

    markSelectedViewInTree: function(){
        if( Ext.isEmpty(this.selectedViewId) || !this.treePanel.isVisible() ){
            return;
        }
        var tmpTreeStore = this.treePanel.store;
        var tmpViewRecord = tmpTreeStore.getNodeById(this.selectedViewId);
        if( Ext.isEmpty(tmpViewRecord) ){
            return;
        }
        this.treePanel.selectPath(tmpViewRecord.getPath());
    },

    getItems: function () {
        this.treePanel = this.createTreePanel();
        this.contentArea = this.createContentArea();
        return [
            this.treePanel,
            this.contentArea
        ];
    },

    createTreePanel: function () {
        var tmpTreeStoreItems = this.getTreeStoreItemsBasedOnViewModels(this.viewModels);
        var tmpStore = Ext.create('Ext.data.TreeStore', {
            fields: [
                {name: 'pageName'},
                {name: 'text'}
            ],
            root: {
                children: tmpTreeStoreItems
            }
        });
        var tmpTreePanel = Ext.create('Ext.tree.Panel', {
            title: 'Simple Tree',
            columnWidth: 0.20,
            store: tmpStore,
            rootVisible: false,
            listeners: {
                scope: this,
                afterrender: this.onTreePanelAfterRender,
                select: this.onTreeItemSelected
            }
        });
        return tmpTreePanel;
    },

    onTreePanelAfterRender: function(){
        this.markSelectedViewInTree();
    },

    getTreeStoreItemsBasedOnViewModels: function(argViews){
        if( Ext.isEmpty(argViews) ){
            return null;
        }
        var tmpTreeStoreItems = [];
        for( var tmpIndex=0;tmpIndex < argViews.length;tmpIndex++ ){
            var tmpViewModel = argViews[tmpIndex];
            if( tmpViewModel.get('includeInTree') === false ){
                continue;
            }
            var tmpTreeStoreItem = this.getTreeStoreItemBasedOnViewModel(tmpViewModel);
            tmpTreeStoreItems.push(tmpTreeStoreItem);
        }
        return tmpTreeStoreItems;
    },

    getTreeStoreItemBasedOnViewModel: function(argViewModel){
        if( Ext.isEmpty(argViewModel) ){
            return null;
        }
        var tmpIsLeaf = false;
        if( Ext.isEmpty(argViewModel.get("children")) ){
            tmpIsLeaf = true;
        }
        var tmpTreeStoreItem = {
            id: argViewModel.get('id'),
            text: argViewModel.get('label'),
            pageName: argViewModel.get('name'),
            leaf: tmpIsLeaf,
            children: this.getTreeStoreItemsBasedOnViewModels(argViewModel.get("children"))
        };
        return tmpTreeStoreItem;
    },

    createContentArea: function(){
        var tmpContentArea = Ext.create('Framework.ux.view.CardViewsContainer',{
            columnWidth: 0.80
        });
        return tmpContentArea;
    },

    hideTree: function(){
        this.treePanel.setVisible(false);
        this.contentArea.columnWidth = 1;
    },

    showTree: function(){
        this.treePanel.setVisible(true);
        this.contentArea.columnWidth = 0.80;
    },

    onTreeItemSelected: function(argRowSelectionModel,argRecord,argIndex){
        var isLeaf = argRecord.get('leaf');
        if( !isLeaf ){
            return;
        }
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, argRecord.get('pageName'));
    }

});