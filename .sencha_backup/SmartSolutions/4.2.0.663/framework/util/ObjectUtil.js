/**
 * Contains all default values related to the application framework
 */
Ext.define('Framework.util.ObjectUtil', {
	
	statics: {

        getValueOrDefault: function(argValue,argDefault){
            if( Ext.isEmpty(argValue) ){
                return argDefault;
            }
            return argValue;
        },

        runCallback: function(argCallback,argScope,argParams,argShowFatalError){
            if( Ext.isEmpty(argShowFatalError) ){
                argShowFatalError = true;
            }
            if (Ext.isFunction(argCallback)) {
                argCallback.call(argScope,argParams);
                return;
            }
            if(argShowFatalError){
                Framework.core.ErrorsManager.handleFatalError(Framework.core.Defaults.FATAL_ERROR_INVALID_CALLBACK);
            }
        }

	}
    
});
