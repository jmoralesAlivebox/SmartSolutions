/**
 * Use to inject single or multiples javascript files
 */
Ext.define('Framework.util.MultipleScriptInjector', {
	
	statics: {

        injectScriptFiles: function(argScriptFiles,argSuccessCallback,argFailureCallback,argScope){
            if( Ext.isEmpty(argScriptFiles) ){
                Framework.util.ObjectUtil.runCallback(argSuccessCallback,argScope);
                return;
            }
            var that = this;
            var tmpScriptFile = argScriptFiles[0];
            Ext.Loader.injectScriptElement(tmpScriptFile,
                function(){
                    argScriptFiles = argScriptFiles.slice(1,argScriptFiles.length);
                    that.injectScriptFiles(argScriptFiles,argSuccessCallback,argFailureCallback,argScope)
                },
                function(){
                    Framework.util.ObjectUtil.runCallback(argFailureCallback,argScope);
                },this);
        }

	}
    
});
