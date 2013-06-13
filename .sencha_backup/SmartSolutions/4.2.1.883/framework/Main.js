/**
 * This the main class for the WebFramework.
 */
Ext.define('Framework.Main', {

    singleton:true,

    requires:[
        'Framework.core.CoreDependencies',
        'Framework.util.UtilDependencies',
        'Framework.ux.UxDependencies',
        'Ext.util.History',
        'Ext.state.CookieProvider',
        'Ext.state.Manager',
        'Ext.util.Cookies'
    ],

    callback:undefined,
    scope:this,
    localizationManagement: {
        enabled: false
    },
    errorsManagement: {
        enabled: false
    },
    viewsManagement: {
        enabled: false
    },

    init:function (argConfig) {
        Ext.apply(this, argConfig);
        this.initStateManager();
        this.initHistorySupport();
    },

    initStateManager: function(){
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    },

    initHistorySupport: function(){
        Ext.util.History.init(this.onHistoryInitiated,this);
    },

    onHistoryInitiated: function(){
        this.validateLocalizationManagement();
    },

    validateLocalizationManagement:function () {
        if( !this.localizationManagement.enabled ){
            this.validateViewsManagement();
            return;
        }
        Framework.core.LocalizationManager.init({
            scope:this,
            callback:this.onLocalizationInitialized,
            enabled: this.localizationManagement.enabled,
            filesBaseUrls: this.localizationManagement.filesBaseUrls
        });
    },

    onLocalizationInitialized:function () {
        this.validateErrorsManagement();
    },

    validateErrorsManagement: function(){
        if( !this.errorsManagement.enabled ){
            this.validateViewsManagement();
            return;
        }
        Framework.core.ErrorsManager.init({
            enabled: this.errorsManagement.enabled,
            errorCodesClass: this.errorsManagement.errorCodesClass
        });
        this.validateViewsManagement();
    },

    validateViewsManagement: function(){
        if( !this.viewsManagement.enabled ){
            Framework.util.ObjectUtil.runCallback(this.callback,this.scope,null,false);
            return;
        }
        this.viewsManagement.scope = this;
        this.viewsManagement.callback = this.onViewsManagerInitiated;
        Framework.core.ViewsManager.init(this.viewsManagement);
    },

    onViewsManagerInitiated: function(){
        Framework.util.ObjectUtil.runCallback(this.callback,this.scope,null,false);
    }

});