Ext.Loader.setConfig({
    enabled:true,
    paths: {
        'Framework': 'framework'
    }
});

Ext.syncRequire([
    'Framework.Main'
]);

Ext.application({

    name:'Sandbox',
    appFolder: 'sandbox',
    autoCreateViewport:false,

    launch:function () {
        var tmpQueryStringArray = document.location.href.split('?');
        if( Ext.isEmpty(tmpQueryStringArray) || tmpQueryStringArray.length <= 1 ){
            alert('You must specify in the queryString the package of the test file you want to run in the sandbox!!');
            return;
        }
        var tmpQueryString = tmpQueryStringArray[1];
        var tmpQueryStringObject = Ext.Object.fromQueryString(tmpQueryString);
        var tmpTestContainer = Ext.create(tmpQueryStringObject.package);
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                tmpTestContainer
            ]
        });
    }

});
