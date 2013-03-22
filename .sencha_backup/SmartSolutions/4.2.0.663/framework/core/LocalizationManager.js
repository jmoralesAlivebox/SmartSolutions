/**
 * Handles all logic related to the application localization (Multilanguage)
 */
Ext.define('Framework.core.LocalizationManager', {

    singleton: true,

    currentLanguage: undefined,
    callback: undefined,
    scope: this,
    enabled: false,
    filesBaseUrls: undefined,

    init: function(argConfig){
        Ext.apply(this,argConfig);
        this.currentLanguage = this.extractCurrentLanguage();
        this.loadLocaleFiles();
    },

    extractCurrentLanguage: function(){
        var tmpLanguage = this.extractLanguageFromUrl();
        if(tmpLanguage){
            return tmpLanguage;
        }
        tmpLanguage = this.extractLanguageFromUserMachine();
        if(tmpLanguage){
            return tmpLanguage;
        }
        return Framework.core.Defaults.DEFAULT_LANGUAGE;
    },

    extractLanguageFromUrl: function(){
        var tmpUrlParams = Ext.urlDecode(window.location.search.substring(1));
        if(tmpUrlParams.lang){
            return tmpUrlParams.lang;
        }
        return undefined;
    },

    extractLanguageFromUserMachine: function(){
        if (navigator.userLanguage){
            return navigator.userLanguage.substring(0,2);
        }
        if(navigator.language){
            return navigator.language.substring(0,2);
        }
        return undefined;
    },

    loadLocaleFiles: function(){
        this.filesBaseUrls = this.addCurrentLanguageToLocaleFilesBaseUrls();
        if( Ext.isEmpty(this.filesBaseUrls) ){
            Framework.core.ErrorsManager.handleFatalError(Framework.core.Defaults.FATAL_ERROR_LOCALES_FILES_NOT_SPECIFIED);
            return;
        }
        Framework.util.MultipleScriptInjector.injectScriptFiles(this.filesBaseUrls,this.onLocaleFilesLoadSuccess,this.onLocaleFilesLoadFailure,this);
    },

    addCurrentLanguageToLocaleFilesBaseUrls: function(){
        if( Ext.isEmpty(this.filesBaseUrls) ){
            return [];
        }
        for(var tmpIndex=0;tmpIndex < this.filesBaseUrls.length;tmpIndex++){
            var tmpLocaleFileBaseUrl = this.filesBaseUrls[tmpIndex];
            tmpLocaleFileBaseUrl = tmpLocaleFileBaseUrl + this.currentLanguage + Framework.core.Defaults.JAVASCRIPT_EXTENSION;
            this.filesBaseUrls[tmpIndex] = tmpLocaleFileBaseUrl;
        }
        return this.filesBaseUrls;
    },

    onLocaleFilesLoadSuccess: function(){
        if(Ext.isFunction(this.callback)){
            this.callback.call(this.scope);
        }
    },

    onLocaleFilesLoadFailure: function(){
        Framework.core.ErrorsManager.handleFatalError(Framework.core.Defaults.FATAL_ERROR_LOCALES_FILES_NOT_FOUND);
    },

    /**
     * Here we change current language, the function expects the language abbreviation,
     *  for example: en(English), es(Spanish)
     */
    setLanguageByAbbreviation: function(argLanguageAbbreviation){
        if( Ext.isEmpty(argLanguageAbbreviation) ){
            return;
        }
        window.location.search = Ext.urlEncode({"lang":argLanguageAbbreviation});
    }

});
