Ext.define('Framework.ux.view.SimpleViewsContainer',{
	
	extend: 'Framework.ux.view.BaseViewsContainer',
	alias: 'widget.simpleviewscontainer',
    cls: 'simple-views-container',

    assignViewsWrapper: function(){
        this.viewsWrapper = this;
    }

});