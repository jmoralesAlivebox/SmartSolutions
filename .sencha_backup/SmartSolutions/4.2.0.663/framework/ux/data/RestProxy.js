Ext.define('Framework.ux.data.RestProxy',{
	
	extend: 'Ext.data.proxy.Rest',
	alias: 'proxy.restproxy',

    requires: [
        'Framework.ux.data.RestJsonReader'
    ],

    statics: {

        currentHeaders: {
            "Accept": "*/*"
        },

        setHeaders: function(argHeaders){
            Ext.apply(this.currentHeaders,argHeaders);
        }

    },

    defaultReader: {
        type: 'restjsonreader',
        successProperty: 'success',
        root: "result"
    },

    defaultWriter: {
        type: 'json'
    },

    constructor: function(argConfig){
        if( Ext.isEmpty(argConfig.reader) ){
            argConfig.reader = this.defaultReader;
        }
        if( Ext.isEmpty(argConfig.writer) ){
            argConfig.writer = this.defaultWriter;
        }
        this.callParent(arguments);
    },

    doRequest: function(argOperation,argCallback,argScope){
        if( Ext.isEmpty(this.headers) ){
            this.headers = {};
        }
        Ext.apply(this.headers,Framework.ux.data.RestProxy.currentHeaders);
        this.callParent(arguments);
    },

    getUrl: function(argRequest){
        var tmpUrlOverride = argRequest.operation.urlOverride;
        if( !Ext.isEmpty(tmpUrlOverride) ){
            return tmpUrlOverride;
        }
        return this.url;
    },

    processResponse: function(argSuccess, argOperation, argRequest, argResponse, argCallback, argScope) {
        if(argResponse.status === Framework.core.Defaults.RESPONSE_STATUS_SERVICE_NOT_AVAILABLE){
            var tmpErrorMessage = Framework.core.Defaults.SIMPLE_ERROR_WEBSERVICE_NOT_AVAILABLE;
            Framework.core.ErrorsManager.handleSimpleError(tmpErrorMessage);
        }
        if(argResponse.status === Framework.core.Defaults.RESPONSE_STATUS_REQUESTED_URL_NOT_FOUND_ON_SERVER){
            var tmpErrorMessage = Framework.core.Defaults.SIMPLE_ERROR_REQUESTED_URL_NOT_FOUND_ON_SERVER;
            Framework.core.ErrorsManager.handleSimpleError(tmpErrorMessage);
        }
        this.callParent(arguments);
    }

});