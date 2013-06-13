Ext.Loader.setConfig({
    enabled:true,
    paths: {
        'Framework': 'framework'
    }
});

Ext.syncRequire([
    'Framework.Main'
]);

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.application({

    name: 'SmartSolutions',

    requires: [
        'SmartSolutions.defaults.Constants',
        'SmartSolutions.defaults.WebServices',
        'SmartSolutions.view.solutions.SolutionsView'
    ],

    controllers: [
        'MainController',
        'login.LoginController',
        'login.RegisterController',
        'login.ForgotPasswordController',
        'categories.MainCategoriesController',
        'solutions.CreateSolutionController',
        'solutions.YourSolutionsController',
        'components.SearchController'

    ],

    autoCreateViewport:false,

    launch:function () {
        this.loadConfigurationFile();
    },

    loadConfigurationFile: function(){
        var tmpParams = {
            fileUrl: "config/configFile.json"
        };
        Framework.util.FileLoader.loadAndDecodeJsonFile('resources/fileLoader.php',tmpParams,this.onConfigLoaded,this.onConfigFail,this);
    },

    onConfigLoaded: function(argConfigFileObject){
        Framework.Main.init(argConfigFileObject);
    },

    onConfigFail:function () {
        Framework.core.ErrorsManager.handleFatalError(Framework.core.Defaults.FATAL_ERROR_CONFIG_FILE_LOADER_NOT_FOUND_OR_INVALID);
    }

});
