/**
 * Contains all default values related to the application framework
 */
Ext.define('Framework.core.Defaults', {

	statics: {

        DEFAULT_LANGUAGE: "en",
        JAVASCRIPT_EXTENSION: ".js",

        RESPONSE_STATUS_SERVICE_NOT_AVAILABLE: 503,
        RESPONSE_STATUS_REQUESTED_URL_NOT_FOUND_ON_SERVER: 404,

        FATAL_ERROR_CONFIG_FILE_LOADER_NOT_FOUND_OR_INVALID: "The configuration file loader was not found on the server or is malformed.",
        FATAL_ERROR_ERROR_CODES_CLASS_NOT_SPECIFIED: "Impossible to initialize Error Management, the ErrorCodesClass was not specified or is invalid. Please contact system administrator",
        FATAL_ERROR_VIEWS_CONTAINER_NOT_SPECIFIED: "Impossible to render page, when createViewPort is true a viewsContainer must be specified",
        FATAL_ERROR_INVALID_VIEWS_CONTAINER: "Impossible to create views container: {0}",
        FATAL_ERROR_INVALID_CALLBACK: "Impossible to finish framework initialization. The callback specified does not exists",
        FATAL_ERROR_LOCALES_FILES_NOT_SPECIFIED: "Localization is enabled but localization files were not specified",
        FATAL_ERROR_LOCALES_FILES_NOT_FOUND: "Some localization files were not found on the server",
        SIMPLE_ERROR_WEBSERVICE_NOT_AVAILABLE: "The webservice is not available. Please contact system administrator",
        SIMPLE_ERROR_REQUESTED_URL_NOT_FOUND_ON_SERVER: "The requested url was not found on the server. Please contact system administrator",
        SIMPLE_ERROR_INVALID_PERMISSIONS_FOR_PAGE: "Current user does not have enough permissions to access page: {0}"

	}
    
});
