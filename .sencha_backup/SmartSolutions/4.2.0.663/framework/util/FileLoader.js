/**
 * Used to load any type of files, if you are loading a json file you can indicate the class to
 *  decode the result in order to return an object instead of the raw json.
 */
Ext.define('Framework.util.FileLoader', {
	
	statics: {

        loadFile: function(argFileUrl,argParams,argSuccessCallback,argFailureCallback,argScope){
            Ext.Ajax.request({
                scope: argScope,
                url: argFileUrl,
                method: 'GET',
                params: argParams,
                success: function(argResponse){
                    var tmpResponseText = "";
                    if( !Ext.isEmpty(argResponse) ){
                        tmpResponseText = argResponse.responseText;
                    }
                    Framework.util.ObjectUtil.runCallback(argSuccessCallback,argScope,tmpResponseText);
                },
                failure: argFailureCallback
            });
        },

        loadAndDecodeJsonFile: function(argFileUrl,argParams,argSuccessCallback,argFailureCallback,argScope){
            Ext.Ajax.request({
                scope: argScope,
                url: argFileUrl,
                method: 'GET',
                params: argParams,
                success: function(argResponse){
                    var tmpResponseText = null;
                    var tmpResponseTextDecoded = null;
                    try {
                        tmpResponseText = null;
                        if( !Ext.isEmpty(argResponse) ){
                            tmpResponseText = argResponse.responseText;
                        }
                        tmpResponseTextDecoded = Ext.decode(tmpResponseText);
                    } catch (argError) {
                        Framework.util.ObjectUtil.runCallback(argFailureCallback,argScope);
                    }
                    if( !Ext.isEmpty(tmpResponseTextDecoded) ){
                        Framework.util.ObjectUtil.runCallback(argSuccessCallback,argScope,tmpResponseTextDecoded);
                    }
                },
                failure: argFailureCallback
            });
        }

	}
    
});
