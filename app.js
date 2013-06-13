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
        Mercury.util.FileLoader.loadAndDecodeJsonFile('resources/config/configFile.json',null,this.onConfigLoaded,this.onConfigFail,this);
    },

    onConfigLoaded: function(argConfigFileObject){
        Mercury.Main.init(argConfigFileObject);
    },

    onConfigFail:function () {
        Mercury.core.ErrorsManager.handleFatalError(Mercury.core.Defaults.FATAL_ERROR_CONFIG_FILE_LOADER_NOT_FOUND_OR_INVALID);
    }

});
