/**
 * Handles all logic related to the errors handling in the application
 */
Ext.define('Framework.core.ErrorsManager', {
	
    singleton: true,

    enabled: false,
    errorCodesClass: undefined,
    errorCallbacks: {},

    init: function(argConfig){
        Ext.apply(this,argConfig);
        this.errorCodesClass = Ext.ClassManager.get(this.errorCodesClass);
        if( Ext.isEmpty(this.errorCodesClass) ){
            this.handleFatalError(Framework.core.Defaults.FATAL_ERROR_ERROR_CODES_CLASS_NOT_SPECIFIED);
        }
    },

    handleSimpleErrorByCode: function(argErrorCode){
        if( Ext.isEmpty(this.errorCodesClass) || Ext.isEmpty(argErrorCode) ){
            return;
        }
        this.handleSimpleError(this.errorCodesClass[argErrorCode]);
        this.executeErrorCallbacks(argErrorCode);
    },

    handleFatalErrorByCode: function(argErrorCode){
        if( Ext.isEmpty(this.errorCodesClass) || Ext.isEmpty(argErrorCode) ){
            return;
        }
        this.handleFatalError(this.errorCodesClass[argErrorCode]);
        this.executeErrorCallbacks(argErrorCode);
    },

    handleFatalError: function(argMessage){
    	this.showErrorWindow(argMessage,"Fatal Error!!!",false);
    },

    handleSimpleError: function(argMessage){
    	this.showErrorWindow(argMessage,"Error",true);
    },

    registerCallbackForError: function(argErrorCode,argCallback,argScope){
        if( Ext.isEmpty(argErrorCode) || Ext.isEmpty(argCallback) ){
            return;
        }
        var tmpErrorCallbacks = this.getErrorCallbacks(argErrorCode);
        tmpErrorCallbacks.push({
            scope: argScope,
            callback: argCallback
        });
        this.errorCallbacks[argErrorCode] = tmpErrorCallbacks;
    },

    getErrorCallbacks: function(argErrorCode){
        if( Ext.isEmpty(argErrorCode) ){
            return [];
        }
        var tmpErrorCallbacks = this.errorCallbacks[argErrorCode];
        if( Ext.isEmpty(tmpErrorCallbacks) ){
            return [];
        }
        return tmpErrorCallbacks;
    },

    executeErrorCallbacks: function(argErrorCode){
        if( Ext.isEmpty(argErrorCode) ){
            return null;
        }
        var tmpErrorCallbacks = this.getErrorCallbacks(argErrorCode);
        if( Ext.isEmpty(tmpErrorCallbacks) ){
            return;
        }
        for( var tmpIndex=0;tmpIndex < tmpErrorCallbacks.length;tmpIndex++ ){
            var tmpErrorCallback = tmpErrorCallbacks[tmpIndex];
            Framework.util.ObjectUtil.runCallback(tmpErrorCallback.callback,tmpErrorCallback.scope,null,false);
        }
    },
    
    showErrorWindow: function(argMessage,argTitle,argClosable){
    	var tmpErrorWindow = Ext.create('Framework.ux.popup.ErrorWindow',{
    		title: argTitle,
    		closable: argClosable,
    		errorMessage: argMessage
    	});
    	tmpErrorWindow.show();
    }
    
});
