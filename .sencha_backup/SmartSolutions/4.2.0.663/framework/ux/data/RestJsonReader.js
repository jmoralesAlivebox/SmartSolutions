Ext.define('Framework.ux.data.RestJsonReader', {

    extend:'Ext.data.reader.Json',
    alias:'reader.restjsonreader',

    getResponseData:function (argResponse) {
        var tmpData, tmpError;
        try {
            tmpData = Ext.decode(argResponse.responseText);
        } catch (argException) {
            tmpError = this.getError(argException);
            return tmpError;
        }
        if( !Ext.isEmpty(tmpData.error) ){
            Framework.core.ErrorsManager.handleSimpleErrorByCode(tmpData.error);
        }
        return this.readRecords(tmpData);
    },

    getError: function(argException){
        var tmpError = new Ext.data.ResultSet({
            total:0,
            count:0,
            records:[],
            success:false,
            message:argException.message
        });
        return tmpError;
    }

});