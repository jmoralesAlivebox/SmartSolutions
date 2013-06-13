(function() {

/**
 * Utilitary class to help you to include very easy a drag selection to a specific component
 */
Ext.define('Mercury.util.DragSelectionUtil', {
	
	extend: 'Ext.util.Observable',
	
	/**
	 * Scope in which all events will be called
	 */
	scope: undefined,
	
	isDragging: false,
	constrainTo: undefined,
	dragSelectionBox: undefined,
	
	constructor: function(argConfig){
		Ext.apply(this,argConfig);
		if(!this.constrainTo){
			return;
		}
		this.createDrawSelectionBox();
		this.initializeDragTracker();
	},
	
	/**
	 * Creates the dragSelection component, this component will be used to draw the selection box
	 */
	createDrawSelectionBox: function(){
		this.dragSelectionBox = Ext.create("Ext.Component",{
			cls: 'dragSelectionBox'
		});
		this.constrainTo.add(this.dragSelectionBox);
	},
	
	/**
	 * Initializes the dragTracker component
	 */
	initializeDragTracker: function(){
		var that = this;
		var tmpDragSelectionTracker = Ext.create('Ext.dd.DragTracker', {
            constrainTo: this.constrainTo,
            el: this.constrainTo.el,
            onStart: function(argEvent){
            	that.isDragging = true;
            	that.dragSelectionBox.el.setStyle("z-index","80000");
            },
            onDrag: function(argEvent){
            	var tmpStartXY = this.startXY;
        		var tmpCurrentXY = this.getXY();
        		that.drawSelectionBox(tmpStartXY,tmpCurrentXY);
            },
            onEnd: function(argEvent){
            	that.dragSelectionBox.el.setStyle("z-index","19001");
            	that.constrainTo.fireEvent('dragSelectionEnd',that.dragSelectionBox.el.getRegion());
            	that.clearSelectionBox();
        		Ext.defer(function(){
        			that.isDragging = false;
        		},10,this);
            }
        });
	},
	
	/**
	 * Called on drag event, draws the selection box
	 */
	drawSelectionBox: function(argStartXY,argCurrentXY){
        var tmpMinX = Math.min(argStartXY[0], argCurrentXY[0]);
        var tmpMinY = Math.min(argStartXY[1], argCurrentXY[1]);
        var tmpWidth = Math.abs(argStartXY[0] - argCurrentXY[0]);
        var tmpHeight = Math.abs(argStartXY[1] - argCurrentXY[1]);
        this.dragSelectionBox.el.setStyle("width",tmpWidth + "px");
		this.dragSelectionBox.el.setStyle("height",tmpHeight + "px");
		this.dragSelectionBox.el.setStyle("left",tmpMinX + "px");
		this.dragSelectionBox.el.setStyle("top",tmpMinY + "px");
	},
	
	/**
	 * Clears the selection box setting width, height, x and y to 0
	 */
	clearSelectionBox: function(){
		this.dragSelectionBox.el.setStyle("width","0px");
		this.dragSelectionBox.el.setStyle("height","0px");
		this.dragSelectionBox.el.setStyle("left","0px");
		this.dragSelectionBox.el.setStyle("top","0px");
	}
	
});

/**
 * Used to load any type of files, if you are loading a json file you can indicate the class to
 *  decode the result in order to return an object instead of the raw json.
 */
Ext.define('Mercury.util.FileLoader', {
	
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
                    Mercury.util.ObjectUtil.runCallback(argSuccessCallback,argScope,tmpResponseText);
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
                        Mercury.util.ObjectUtil.runCallback(argFailureCallback,argScope);
                    }
                    if( !Ext.isEmpty(tmpResponseTextDecoded) ){
                        Mercury.util.ObjectUtil.runCallback(argSuccessCallback,argScope,tmpResponseTextDecoded);
                    }
                },
                failure: argFailureCallback
            });
        }

	}
    
});

/**
 * Utilitary class to map functions to specific keyboard keys
 */
Ext.define('Mercury.util.HotkeysUtil', {
	
	/**
	 * Scope in which all events will be called
	 */
	scope: undefined,
	
	/**
	 * The component that will be listening for the key events
	 */
	bindingComponent: undefined,
	
	numPlusFunction: undefined,
	numMinusFunction: undefined,
	ctrlcFunction: undefined,
	ctrlvFunction: undefined,
    
	constructor: function(argConfig){
		Ext.apply(this,argConfig);
		if(!this.bindingComponent){
			this.bindingComponent = Ext.getBody();
		}
		var tmpKeyMap = Ext.create("Ext.util.KeyMap",this.bindingComponent);
		if(this.numPlusFunction){
			tmpKeyMap.addBinding({
				key: Ext.EventObject.NUM_PLUS,
				scope: this.scope,
				shift: false,
				ctrl: false,
				stopEvent: true,
				fn: this.numPlusFunction
			});
		}
		if(this.numMinusFunction){
			tmpKeyMap.addBinding({
				key: Ext.EventObject.NUM_MINUS,
				scope: this.scope,
				shift: false,
				ctrl: false,
				stopEvent: true,
				fn: this.numMinusFunction
			});
		}
		if(this.ctrlcFunction){
			tmpKeyMap.addBinding({
				key: Ext.EventObject.C,
				scope: this.scope,
				shift: false,
				ctrl: true,
				stopEvent: true,
				fn: this.ctrlcFunction
			});
		}
		if(this.ctrlvFunction){
			tmpKeyMap.addBinding({
				key: Ext.EventObject.V,
				scope: this.scope,
				shift: false,
				ctrl: true,
				stopEvent: true,
				fn: this.ctrlvFunction
			});
		}
	}
    
});

Ext.define('Mercury.util.MD5Util', {

    statics:{

        /**
         * Converts a 32-bit number to a hex string with ls-byte first
         */
        hex_chr:"0123456789abcdef",

        rhex:function (argNumber) {
            var tmpResultString = "";
            for (var tmpIndex = 0; tmpIndex <= 3; tmpIndex++)
                tmpResultString += this.hex_chr.charAt((argNumber >> (tmpIndex * 8 + 4)) & 0x0F) +
                    this.hex_chr.charAt((argNumber >> (tmpIndex * 8)) & 0x0F);
            return tmpResultString;
        },

        /*
         * Convert a string to a sequence of 16-word blocks, stored as an array.
         * Append padding bits and the length, as described in the MD5 standard.
         */
        str2blks_MD5:function (str) {
            var nblk = ((str.length + 8) >> 6) + 1;
            var blks = new Array(nblk * 16);
            for (var i = 0; i < nblk * 16; i++) {
                blks[i] = 0;
            }
            for (var i = 0; i < str.length; i++) {
                blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
            }
            blks[i >> 2] |= 0x80 << ((i % 4) * 8);
            blks[nblk * 16 - 2] = str.length * 8;
            return blks;
        },

        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        add:function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        },

        /*
         * Bitwise rotate a 32-bit number to the left
         */
        rol:function (num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        },

        /*
         * These functions implement the basic operation for each round of the
         * algorithm.
         */
        cmn:function (q, a, b, x, s, t) {
            return this.add(this.rol(this.add(this.add(a, q), this.add(x, t)), s), b);
        },

        ff:function (a, b, c, d, x, s, t) {
            return this.cmn((b & c) | ((~b) & d), a, b, x, s, t);
        },

        gg:function (a, b, c, d, x, s, t) {
            return this.cmn((b & d) | (c & (~d)), a, b, x, s, t);
        },

        hh:function (a, b, c, d, x, s, t) {
            return this.cmn(b ^ c ^ d, a, b, x, s, t);
        },

        ii:function (a, b, c, d, x, s, t) {
            return this.cmn(c ^ (b | (~d)), a, b, x, s, t);
        },

        /*
         * Take a string and return the hex representation of its MD5.
         */
        calcMD5:function (str) {
            var x = this.str2blks_MD5(str);
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for(var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = this.ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = this.ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = this.ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = this.ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = this.ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = this.ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = this.ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = this.ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = this.ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = this.ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = this.ff(c, d, a, b, x[i + 10], 17, -42063);
                b = this.ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = this.ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = this.ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = this.ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = this.ff(b, c, d, a, x[i + 15], 22, 1236535329);

                a = this.gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = this.gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = this.gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = this.gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = this.gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = this.gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = this.gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = this.gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = this.gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = this.gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = this.gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = this.gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = this.gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = this.gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = this.gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = this.gg(b, c, d, a, x[i + 12], 20, -1926607734);

                a = this.hh(a, b, c, d, x[i + 5], 4, -378558);
                d = this.hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = this.hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = this.hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = this.hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = this.hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = this.hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = this.hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = this.hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = this.hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = this.hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = this.hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = this.hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = this.hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = this.hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = this.hh(b, c, d, a, x[i + 2], 23, -995338651);

                a = this.ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = this.ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = this.ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = this.ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = this.ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = this.ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = this.ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = this.ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = this.ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = this.ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = this.ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = this.ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = this.ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = this.ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = this.ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = this.ii(b, c, d, a, x[i + 9], 21, -343485551);

                a = this.add(a, olda);
                b = this.add(b, oldb);
                c = this.add(c, oldc);
                d = this.add(d, oldd);
            }
            return this.rhex(a) + this.rhex(b) + this.rhex(c) + this.rhex(d);
        }

    }

});

/**
 * Use to inject single or multiples javascript files
 */
Ext.define('Mercury.util.MultipleScriptInjector', {
	
	statics: {

        injectScriptFiles: function(argScriptFiles,argSuccessCallback,argFailureCallback,argScope){
            if( Ext.isEmpty(argScriptFiles) ){
                Mercury.util.ObjectUtil.runCallback(argSuccessCallback,argScope);
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
                    Mercury.util.ObjectUtil.runCallback(argFailureCallback,argScope);
                },this);
        }

	}
    
});

/**
 * Contains all default values related to the application framework
 */
Ext.define('Mercury.util.ObjectUtil', {
	
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
                Mercury.core.ErrorsManager.handleFatalError(Mercury.core.Defaults.FATAL_ERROR_INVALID_CALLBACK);
            }
        },

        getAsArray: function(argValue){
            if( Ext.isEmpty(argValue) ){
                return;
            }
            if( Ext.isArray(argValue) ){
                return argValue;
            }
            return [argValue];
        }

	}
    
});

/**
 * Utilitary class with helper methods needed to deal with styling, 
 *  here we handle styles validating the browser in which we are
 */
Ext.define('Mercury.util.StylesUtil', {
	
    singleton: true,
    
    setZoomStyle: function(argComponent,argZoomValue){
    	if(!argComponent){
    		return;
    	}
    	var tmpScaleValue = "scale(" + argZoomValue + ")";
    	argComponent.el.setStyle('-ms-transform',tmpScaleValue);
    	argComponent.el.setStyle('-moz-transform',tmpScaleValue);
    	argComponent.el.setStyle('-webkit-transform',tmpScaleValue);
    	argComponent.el.setStyle('-o-transform',tmpScaleValue);
    	argComponent.el.setStyle('transform',tmpScaleValue);
    	if(Ext.isIE){
    		argComponent.el.setStyle("zoom",argZoomValue);
    	}
    }
    
});

/**
 * Contains all default values related to the application framework
 */
Ext.define('Mercury.core.Defaults', {

	statics: {

        DEFAULT_LANGUAGE: "en",
        JAVASCRIPT_EXTENSION: ".js",

        RESPONSE_STATUS_SERVICE_NOT_AVAILABLE: 503,
        RESPONSE_STATUS_REQUESTED_URL_NOT_FOUND_ON_SERVER: 404,

        FATAL_ERROR_CONFIG_FILE_LOADER_NOT_FOUND_OR_INVALID: "The configuration file loader was not found on the server or is malformed.",
        FATAL_ERROR_ERROR_CODES_CLASS_NOT_SPECIFIED: "Impossible to initialize Error Management, the ErrorCodesClass was not specified or is invalid. Please contact system administrator",
        FATAL_ERROR_INVALID_VIEWS_CONTAINER: "Impossible to create views container: {0}",
        FATAL_ERROR_INVALID_CALLBACK: "Impossible to finish mercury initialization. The callback specified does not exists",
        FATAL_ERROR_LOCALES_FILES_NOT_SPECIFIED: "Localization is enabled but localization files were not specified",
        FATAL_ERROR_LOCALES_FILES_NOT_FOUND: "Some localization files were not found on the server",
        SIMPLE_ERROR_WEBSERVICE_NOT_AVAILABLE: "The webservice is not available. Please contact system administrator",
        SIMPLE_ERROR_REQUESTED_URL_NOT_FOUND_ON_SERVER: "The requested url was not found on the server. Please contact system administrator",
        SIMPLE_ERROR_INVALID_PERMISSIONS_FOR_PAGE: "Current user does not have enough permissions to access page or the page does not exists. Page name: {0}"

	}
    
});

/**
 * Handles all logic related to the errors handling in the application
 */
Ext.define('Mercury.core.ErrorsManager', {
	
    singleton: true,

    enabled: false,
    errorCodesClass: undefined,
    errorCallbacks: {},

    init: function(argConfig){
        Ext.apply(this,argConfig);
        this.errorCodesClass = Ext.ClassManager.get(this.errorCodesClass);
        if( Ext.isEmpty(this.errorCodesClass) ){
            this.handleFatalError(Mercury.core.Defaults.FATAL_ERROR_ERROR_CODES_CLASS_NOT_SPECIFIED);
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
            Mercury.util.ObjectUtil.runCallback(tmpErrorCallback.callback,tmpErrorCallback.scope,null,false);
        }
    },
    
    showErrorWindow: function(argMessage,argTitle,argClosable){
    	var tmpErrorWindow = Ext.create('Mercury.ux.popup.ErrorWindow',{
    		title: argTitle,
    		closable: argClosable,
    		errorMessage: argMessage
    	});
    	tmpErrorWindow.show();
    }
    
});

/**
 * Class used to handle communication between application views
 */
Ext.define('Mercury.core.EventBus', {
	
	extend: 'Ext.util.Observable',
    singleton: true
    
});

Ext.define('Mercury.core.Events', {

	statics: {

        EVENT_SHOW_PAGE: "viewsManagerShowPage"

	}
    
});

/**
 * Handles all logic related to the application localization (Multilanguage)
 */
Ext.define('Mercury.core.LocalizationManager', {

    singleton: true,

    currentLanguage: undefined,
    callback: undefined,
    scope: this,
    enabled: false,
    filesBaseUrls: undefined,

    init: function(argConfig){
        Ext.apply(this,argConfig);
        this.currentLanguage = this.extractCurrentLanguage();
        this.loadLocaleFiles();
    },

    extractCurrentLanguage: function(){
        var tmpLanguage = this.extractLanguageFromUrl();
        if(tmpLanguage){
            return tmpLanguage;
        }
        tmpLanguage = this.extractLanguageFromUserMachine();
        if(tmpLanguage){
            return tmpLanguage;
        }
        return Mercury.core.Defaults.DEFAULT_LANGUAGE;
    },

    extractLanguageFromUrl: function(){
        var tmpUrlParams = Ext.urlDecode(window.location.search.substring(1));
        if(tmpUrlParams.lang){
            return tmpUrlParams.lang;
        }
        return undefined;
    },

    extractLanguageFromUserMachine: function(){
        if (navigator.userLanguage){
            return navigator.userLanguage.substring(0,2);
        }
        if(navigator.language){
            return navigator.language.substring(0,2);
        }
        return undefined;
    },

    loadLocaleFiles: function(){
        this.filesBaseUrls = this.addCurrentLanguageToLocaleFilesBaseUrls();
        if( Ext.isEmpty(this.filesBaseUrls) ){
            Mercury.core.ErrorsManager.handleFatalError(Mercury.core.Defaults.FATAL_ERROR_LOCALES_FILES_NOT_SPECIFIED);
            return;
        }
        Mercury.util.MultipleScriptInjector.injectScriptFiles(this.filesBaseUrls,this.onLocaleFilesLoadSuccess,this.onLocaleFilesLoadFailure,this);
    },

    addCurrentLanguageToLocaleFilesBaseUrls: function(){
        if( Ext.isEmpty(this.filesBaseUrls) ){
            return [];
        }
        for(var tmpIndex=0;tmpIndex < this.filesBaseUrls.length;tmpIndex++){
            var tmpLocaleFileBaseUrl = this.filesBaseUrls[tmpIndex];
            tmpLocaleFileBaseUrl = tmpLocaleFileBaseUrl + this.currentLanguage + Mercury.core.Defaults.JAVASCRIPT_EXTENSION;
            this.filesBaseUrls[tmpIndex] = tmpLocaleFileBaseUrl;
        }
        return this.filesBaseUrls;
    },

    onLocaleFilesLoadSuccess: function(){
        if(Ext.isFunction(this.callback)){
            this.callback.call(this.scope);
        }
    },

    onLocaleFilesLoadFailure: function(){
        Mercury.core.ErrorsManager.handleFatalError(Mercury.core.Defaults.FATAL_ERROR_LOCALES_FILES_NOT_FOUND);
    },

    /**
     * Here we change current language, the function expects the language abbreviation,
     *  for example: en(English), es(Spanish)
     */
    setLanguageByAbbreviation: function(argLanguageAbbreviation){
        if( Ext.isEmpty(argLanguageAbbreviation) ){
            return;
        }
        window.location.search = Ext.urlEncode({"lang":argLanguageAbbreviation});
    }

});

/**
 * The intention of this class is to be a centralized place where you can 
 *  store variables that are needed to be used in different places.
 */
Ext.define('Mercury.core.ModelLocator', {
	
    singleton: true

});

Ext.define('Mercury.core.SecurityManager', {

    singleton: true,

    logInUser: function(argUsername,argPermissions){
        this.setCurrentUsername(argUsername);
        this.setCurrentPermissions(argPermissions);
    },

    logOutUser: function(){
        this.setCurrentUsername(null);
        this.setCurrentPermissions(null);
    },

    setCurrentUsername: function(argUserName){
        if( Ext.isEmpty(argUserName) ){
            Ext.state.Manager.clear('currentUsername');
            return;
        }
        Ext.state.Manager.set('currentUsername',argUserName);
    },

    getCurrentUsername: function(){
        return Ext.state.Manager.get('currentUsername');
    },

    setCurrentPermissions: function(argPermissions){
        if( Ext.isEmpty(argPermissions) ){
            Ext.state.Manager.clear('currentPermissions');
            return;
        }
        Ext.state.Manager.set('currentPermissions',argPermissions);
    },

    getCurrentPermissions: function(){
        return Ext.state.Manager.get('currentPermissions');
    },

    isUserLogged: function(){
        if( Ext.isEmpty(this.getCurrentUsername()) ){
            return false;
        }
        return true;
    },

    containsPermissions: function(argPermissions){
        if( Ext.isEmpty(argPermissions) ){
            return true;
        }
        var tmpCurrentPermissions = this.getCurrentPermissions();
        if( Ext.isEmpty(tmpCurrentPermissions) ){
            return false;
        }
        for( var tmpIndex=0;tmpIndex < argPermissions.length;tmpIndex++ ){
            var tmpPermission = argPermissions[tmpIndex];
            if( Ext.Array.contains(tmpCurrentPermissions,tmpPermission) ){
                return true;
            }
        }
        return false;
    }

});

Ext.define('Mercury.core.ViewItem', {

    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'label',
            type: 'string'
        },
        {
            name: 'package',
            type: 'string'
        },
        {
            name: 'xtype',
            type: 'string'
        },
        {
            name: 'iframe',
            type: 'string'
        },
        {
            name: 'default',
            type: 'boolean',
            defaultValue: false
        },
        {
            name: 'permissions'
        },
        {
            name: 'hideHeader',
            type: 'boolean',
            defaultValue: false
        },
        {
            name: 'hideFooter',
            type: 'boolean',
            defaultValue: false
        },
        {
            name: 'includeInTree',
            type: 'boolean',
            defaultValue: true
        },
        {
            name: 'includeInTabs',
            type: 'boolean',
            defaultValue: true
        },
        {
            name: 'children',
            defaultValue: undefined
        }
    ]

});

Ext.define('Mercury.core.ViewsManager', {

    singleton: true,

    viewsManagerUI: undefined,

    scope: undefined,
    callback: undefined,
    enabled: false,

    views: undefined,
    viewModels: undefined,
    viewModelsByName: {},
    viewsIdIndex: 0,

    init: function(argConfig){
        this.viewsManagerUI = new Mercury.core.ViewsManagerUI();
        Ext.copyTo(this,argConfig,'scope,callback,enabled,views');
        this.viewsIdIndex = 0;
        this.viewModels = this.convertViewsToViewModels(this.views);
        argConfig.viewModels = this.viewModels;
        argConfig.callback = this.onViewPortBeforeRender;
        argConfig.callbackScope = this;
        var tmpViewPort = this.viewsManagerUI.getViewPort(argConfig);
        if( Ext.isEmpty(tmpViewPort) ){
            var tmpErrorMessage = Ext.util.Format.format(Mercury.core.Defaults.FATAL_ERROR_INVALID_VIEWS_CONTAINER,this.viewsManagerUI.viewsContainerPackage);
            Mercury.core.ErrorsManager.handleFatalError(tmpErrorMessage);
        }
    },

    reconfigureViewsAndShowPage: function(argPage){
        this.reconfigureViews();
        this.showPage(argPage);
    },

    reconfigureViews: function(){
        this.viewsIdIndex = 0;
        this.viewModels = this.convertViewsToViewModels(this.views);
        this.viewsManagerUI.reconfigureViews(this.viewModels);
    },

    convertViewsToViewModels: function(argViews){
        if( Ext.isEmpty(argViews) ){
            return null;
        }
        var tmpViewModels = [];
        for( var tmpIndex=0;tmpIndex < argViews.length;tmpIndex++ ){
            var tmpViewItem = argViews[tmpIndex];
            var tmpViewModel = this.convertViewToViewModel(tmpViewItem);
            if( !Mercury.core.SecurityManager.containsPermissions(tmpViewModel.get('permissions')) ){
                continue;
            }
            if( !Ext.isEmpty(tmpViewItem.children) && Ext.isEmpty(tmpViewModel.get('children')) ){
                continue;
            }
            tmpViewModels.push(tmpViewModel);
            this.viewModelsByName[tmpViewModel.get('name')] = tmpViewModel;
        }
        return tmpViewModels;
    },

    convertViewToViewModel: function(argView){
        if( Ext.isEmpty(argView) ){
            return null;
        }
        this.viewsIdIndex++;
        var tmpViewModel = Ext.create('Mercury.core.ViewItem',argView);
        if( Ext.isEmpty(tmpViewModel.get('id')) || tmpViewModel.get('id') === 0 ){
            tmpViewModel.set('id',this.viewsIdIndex);
        }
        if( Ext.isEmpty(tmpViewModel.get('children')) ){
            return tmpViewModel;
        }
        tmpViewModel.set('children',this.convertViewsToViewModels(tmpViewModel.get('children')));
        return tmpViewModel;
    },

    getViewModelByName: function(argViewName){
        if( Ext.isEmpty(this.viewModels) || Ext.isEmpty(argViewName) ){
            return null;
        }
        return this.viewModelsByName[argViewName];
    },

    onViewPortBeforeRender: function(){
        this.addListeners();
        this.showDefaultPageOrCurrentHistoryPage();
        Mercury.util.ObjectUtil.runCallback(this.callback,this.scope);
    },

    addListeners: function(){
        Mercury.core.EventBus.addListener(Mercury.core.Events.EVENT_SHOW_PAGE,this.showPage,this);
        Ext.util.History.addListener('change',this.onHistoryChange,this);
    },

    showDefaultPageOrCurrentHistoryPage: function(){
        if( Ext.isEmpty(this.viewModels) ){
            return;
        }
        var tmpCurrentHistoryPage = Ext.util.History.getToken();
        if( !Ext.isEmpty(tmpCurrentHistoryPage) ){
            this.showPage(tmpCurrentHistoryPage);
            return;
        }
        this.showDefaultPage();
    },

    showDefaultPage: function(){
        var tmpDefaultPage = this.getDefaultPage(this.viewModels);
        this.showPage(tmpDefaultPage);
    },

    getDefaultPage: function(argViews){
        if( Ext.isEmpty(argViews) ){
            return null;
        }
        var tmpDefaultPage = null;
        for(var tmpIndex=0;tmpIndex < argViews.length;tmpIndex++){
            tmpDefaultPage = null;
            var tmpViewItem = argViews[tmpIndex];
            if( tmpViewItem.get('default') === true ){
                return tmpViewItem.get('name');
            }
            if( !Ext.isEmpty(tmpViewItem.get('children')) ){
                tmpDefaultPage = this.getDefaultPage(tmpViewItem.get('children'));
            }
            if( !Ext.isEmpty(tmpDefaultPage) ){
                return tmpDefaultPage;
            }
        }
        return null;
    },

    showPage: function(argPageName){
        if( Ext.isEmpty(argPageName) ){
            return;
        }
        var tmpPageName = this.getPageNameWithoutQueryString(argPageName);
        var tmpCurrentHistoryPage = this.getPageNameWithoutQueryString(Ext.util.History.getToken());
        if(tmpCurrentHistoryPage === tmpPageName){
            this.addViewToViewsContainer(tmpPageName);
        }else{
            Ext.util.History.add(tmpPageName);
        }
    },

    onHistoryChange: function(argTokenPageName,argOptions){
        var tmpPageName = this.getPageNameWithoutQueryString(argTokenPageName);
        if( Ext.isEmpty(tmpPageName) ){
            return;
        }
        this.addViewToViewsContainer(tmpPageName);
    },

    getPageNameWithoutQueryString: function(argPageName){
        if( Ext.isEmpty(argPageName) ){
            return null;
        }
        var tmpQueryStringIndex = argPageName.indexOf('?');
        if( tmpQueryStringIndex < 0 ){
            return argPageName;
        }
        return argPageName.substring(0,argPageName.indexOf('?'));
    },

    addViewToViewsContainer: function(argViewName){
        var tmpViewModel = this.getViewModelByName(argViewName);
        if( Ext.isEmpty(tmpViewModel) || !Mercury.core.SecurityManager.containsPermissions(tmpViewModel.get('permissions')) ){
            var tmpErrorMessage = Ext.util.Format.format(Mercury.core.Defaults.SIMPLE_ERROR_INVALID_PERMISSIONS_FOR_PAGE,argViewName);
            Mercury.core.ErrorsManager.handleSimpleError(tmpErrorMessage);
            Mercury.core.SecurityManager.logOutUser();
            this.showDefaultPage();
            return;
        }
        this.viewsManagerUI.validateHeaderVisibility(tmpViewModel);
        this.viewsManagerUI.validateFooterVisibility(tmpViewModel);
        this.viewsManagerUI.validateTreeVisibility(tmpViewModel);
        this.viewsManagerUI.validateTabBarVisibility(tmpViewModel);
        this.viewsManagerUI.displayViewByViewModel(tmpViewModel);
    }

});

Ext.define('Mercury.core.ViewsManagerUI', {

    headerPackage: undefined,
    viewsContainerPackage: undefined,
    footerPackage: undefined,

    header: undefined,
    viewsContainer: undefined,
    footer: undefined,
    viewModels: undefined,

    callback: undefined,
    callbackScope: undefined,

    getViewPort: function(argConfig){
        if( Ext.isEmpty(argConfig) ){
            return;
        }
        Ext.copyTo(this,argConfig,'headerPackage,viewsContainerPackage,footerPackage,viewModels,callback,callbackScope');
        var tmpViewPort = this.createViewPort();
        return tmpViewPort;
    },

    createViewPort: function(){
        if( Ext.isEmpty(this.viewsContainerPackage) || Ext.isEmpty(Ext.ClassManager.get(this.viewsContainerPackage)) ){
            return null;
        }
        var tmpViewportItems = this.getViewPortItems();
        var tmpViewPort = Ext.create('Ext.container.Viewport', {
            listeners: {
                scope: this.callbackScope,
                beforerender: this.callback
            },
            cls: 'main-container',
            items: tmpViewportItems
        });
        return tmpViewPort;
    },

    getViewPortItems: function(){
        var tmpItems = [];
        this.header = this.createHeader();
        if( !Ext.isEmpty(this.header) ){
            tmpItems.push(this.header);
        }
        this.viewsContainer = this.createViewsContainer();
        if( !Ext.isEmpty(this.viewsContainer) ){
            tmpItems.push(this.viewsContainer);
        }
        this.footer = this.createFooter();
        if( !Ext.isEmpty(this.footer) ){
            tmpItems.push(this.footer);
        }
        return tmpItems;
    },

    createHeader: function(){
        if( Ext.isEmpty(this.headerPackage) || Ext.isEmpty(Ext.ClassManager.get(this.headerPackage)) ){
            return null;
        }
        var tmpHeader = Ext.create(this.headerPackage);
        tmpHeader.hidden = true;
        return tmpHeader;
    },

    createViewsContainer: function(){
        if( Ext.isEmpty(this.viewsContainerPackage) || Ext.isEmpty(Ext.ClassManager.get(this.viewsContainerPackage)) ){
            return null;
        }
        var tmpViewsContainer = Ext.create(this.viewsContainerPackage,{
            cls: 'views-container',
            viewModels: this.viewModels
        });
        tmpViewsContainer.autoScroll = true;
        return tmpViewsContainer;
    },

    createFooter: function(){
        if( Ext.isEmpty(this.footerPackage) || Ext.isEmpty(Ext.ClassManager.get(this.footerPackage)) ){
            return null;
        }
        var tmpFooter = Ext.create(this.footerPackage);
        tmpFooter.hidden = true;
        return tmpFooter;
    },

    validateHeaderVisibility: function(argViewItem){
        if( Ext.isEmpty(argViewItem) || Ext.isEmpty(this.header) ){
            return;
        }
        if( argViewItem.get('hideHeader') === true ){
            this.header.setVisible(false);
        }else{
            this.header.setVisible(true);
        }
    },

    validateFooterVisibility: function(argViewItem){
        if( Ext.isEmpty(argViewItem) || Ext.isEmpty(this.footer) ){
            return;
        }
        if( argViewItem.get('hideFooter') === true ){
            this.footer.setVisible(false);
        }else{
            this.footer.setVisible(true);
        }
    },

    validateTreeVisibility: function(argViewItem){
        if( Ext.isEmpty(argViewItem) || !this.isViewsContainerTreeRelated() ){
            return;
        }
        if( argViewItem.get('includeInTree') === true ){
            this.viewsContainer.showTree();
        }else{
            this.viewsContainer.hideTree();
        }
    },

    isViewsContainerTreeRelated: function(){
        if( Ext.isEmpty(this.viewsContainerPackage) ){
            return false;
        }
        if( this.viewsContainerPackage === 'Mercury.ux.view.TreeViewsContainer' ||
            this.viewsContainerPackage === 'Mercury.ux.view.TreeTabViewsContainer' ){
            return true;
        }
        return false;
    },

    validateTabBarVisibility: function(argViewItem){
        if( Ext.isEmpty(argViewItem) || !this.isViewsContainerTabsRelated() ){
            return;
        }
        if( argViewItem.get('includeInTabs') === true ){
            this.viewsContainer.showTabBar();
        }else{
            this.viewsContainer.hideTabBar();
        }
    },

    isViewsContainerTabsRelated: function(){
        if( Ext.isEmpty(this.viewsContainerPackage) ){
            return false;
        }
        if( this.viewsContainerPackage === 'Mercury.ux.view.TabViewsContainer' ){
            return true;
        }
        return false;
    },

    displayViewByViewModel: function(argViewModel){
        this.viewsContainer.displayViewByViewModel(argViewModel);
    },

    reconfigureViews: function(argViewModels){
        this.viewModels = argViewModels;
        this.viewsContainer.reconfigureViews(this.viewModels);
    }

});

Ext.define('Mercury.ux.container.IFrameContainer',{
	
	extend: 'Ext.container.Container',
	alias: 'widget.iframecontainer',

    cls: 'iframe-container',

    iframeSrc: undefined,

    initComponent: function(){
        if( Ext.isEmpty(this.iframeSrc) ){
            this.callParent(arguments);
            return;
        }
        this.html = '<iframe frameborder=0 border=0 width="100%" height="100%" style="width:100%;height:100%;" src="' + this.iframeSrc + '"></iframe>'
        this.callParent(arguments);
    }

});
Ext.define('Mercury.ux.container.TabContainer',{
	
	extend: 'Ext.container.Container',
	alias: 'widget.tabcontainer',

    requires: [
        'Ext.layout.container.Card'
    ],

    tabs: undefined,
    toolbar: undefined,
    cardContainer: undefined,
    selectedIndex: -1,
    toolbarCls: undefined,
    toolbarButtonsCls: undefined,
    toolbarButtonsPressedCls: undefined,
    cardContainerCls: undefined,

    initComponent: function(){
        this.toolbar = this.createToolbar();
        this.cardContainer = this.createCardContainer();
        this.items = [
            this.toolbar,
            this.cardContainer
        ];
        this.callParent(arguments);
    },

    createToolbar: function(){
        var tmpToolbarItems = this.extractToolbarItemsFromTabs();
        var tmpToolbar = Ext.create('Ext.toolbar.Toolbar',{
            cls: this.toolbarCls,
            defaults: {
                allowDepress: false
            },
            items: tmpToolbarItems
        });
        return tmpToolbar;
    },

    extractToolbarItemsFromTabs: function(){
        if( Ext.isEmpty(this.items) ){
            return [];
        }
        var tmpToolbarItems = [];
        for( var tmpIndex=0;tmpIndex < this.items.length;tmpIndex++ ){
            var tmpTab = this.items[tmpIndex];
            if( tmpTab.includeInToolbar === false ){
                continue;
            }
            var tmpTooltabItem = this.extractToolbarItemFromTab(tmpTab,tmpIndex);
            if( !Ext.isEmpty(tmpTooltabItem) ){
                tmpToolbarItems.push(tmpTooltabItem);
            }
        }
        return tmpToolbarItems;
    },

    extractToolbarItemFromTab: function(argTab,argTabIndex){
        if( Ext.isEmpty(argTab) ){
            return null;
        }
        var tmpToolbarItem = {
            text: argTab.title,
                enableToggle: true,
                toggleGroup: 'tabcontainertoolbar',
            tabIndex: argTabIndex,
                listeners: {
                    scope: this,
                    toggle: this.onTabSelected
                }
        };
        return tmpToolbarItem;
    },

    createCardContainer: function(){
        var tmpCardContainerItems = this.getCardContainerItems();
        var tmpCardContainer = Ext.create('Ext.container.Container',{
            cls: this.cardContainerCls,
            layout: {
                type: 'card',
                deferredRender: true
            },
            defaults: {
                xtype: 'container'
            },
            autoScroll: true,
            items: tmpCardContainerItems
        });
        return tmpCardContainer;
    },

    getCardContainerItems: function(){
        if( Ext.isEmpty(this.items) ){
            return;
        }
        var tmpCardContainerItems = [];
        for (var tmpIndex = 0; tmpIndex < this.items.length; tmpIndex++) {
            var tmpItem = this.items[tmpIndex];
            tmpItem = this.getCardContainerItemBasedOnTabItem(tmpItem);
            tmpCardContainerItems.push(tmpItem);
        }
        return tmpCardContainerItems;
    },

    getCardContainerItemBasedOnTabItem: function(argItem){
        if( Ext.isEmpty(argItem) ){
            return null;
        }
        if( Ext.isEmpty(argItem.iframe) ){
            return argItem;
        }else{
            return this.createIframeView(argItem.label,argItem.itemId,argItem.iframe);
        }
    },

    createIframeView: function(argTitle,argItemId,argIframe){
        var tmpIFrameView = Ext.create('Mercury.ux.container.IFrameContainer',{
            title: argTitle,
            iframeSrc: argIframe,
            itemId: argItemId
        });
        return tmpIFrameView;
    },

    onTabSelected: function(argButton,argPressed){
        if( !argPressed || argButton.tabIndex === this.selectedIndex ){
            return;
        }
        this.setSelectedIndex(argButton.tabIndex);
        var tmpCardLayout = this.cardContainer.getLayout();
        this.fireEvent('tabchange',this.selectedIndex,tmpCardLayout.getActiveItem());
    },

    onSetFirstTabSelected: function(){
        this.setSelectedIndex(0);
        var tmpCardLayout = this.cardContainer.getLayout();
        this.fireEvent('tabchange',this.selectedIndex,tmpCardLayout.getActiveItem());
    },

    setTabsToDisableByIndexes: function(argIndexesArray, argIsDisabled){
        for( var index in argIndexesArray ){
            var tmpButtonQuery = "button[tabIndex=" + argIndexesArray[index] + "]";
            var tmpTabButton = this.down(tmpButtonQuery);
            tmpTabButton.setDisabled(argIsDisabled);
        }
    },

    setTabsVisibilityByIndex: function(argIndexesArray, argIsVisible){
        var tmpButtonQuery = "button[tabIndex=" + argIndexesArray + "]";
        var tmpTabButton = this.down(tmpButtonQuery);
        tmpTabButton.setVisible(argIsVisible);
    },

    setSelectedIndex: function(argIndex,argReflectToolbar){
        if( Ext.isEmpty(argIndex) || argIndex < 0 || this.selectedIndex === argIndex ){
            return;
        }
        if( Ext.isEmpty(argReflectToolbar) ){
            argReflectToolbar = true;
        }
        var tmpCardLayout = this.cardContainer.getLayout();
        tmpCardLayout.setActiveItem(argIndex);
        this.selectedIndex = argIndex;
        Mercury.core.ModelLocator.tabIndex = this.selectedIndex;
        var tmpTabItem = this.cardContainer.items.getAt(this.selectedIndex);
        if( tmpTabItem.includeInToolbar === false ){
            return;
        }
        if(argReflectToolbar){
            this.toggleSelectedToolbarButton();
        }
    },

    toggleSelectedToolbarButton: function(){
        if( Ext.isEmpty(this.selectedIndex) || this.selectedIndex < 0 ){
            return;
        }
        var tmpCurrentToolbarButton = this.toolbar.items.findBy(function(argItem){
            if(argItem.tabIndex === this.selectedIndex){
                return true;
            }
            return false;
        },this);
        if( Ext.isEmpty(tmpCurrentToolbarButton) || tmpCurrentToolbarButton.pressed === true ){
            return;
        }
        tmpCurrentToolbarButton.toggle();
    },

    addTab: function(argTab){
        var tmpTab = this.getCardContainerItemBasedOnTabItem(argTab);
        this.cardContainer.add(tmpTab);
        this.unToggleSelectedToolbarButton();
        if( argTab.includeInToolbar ){
        var tmpToolbarItem = this.extractToolbarItemFromTab(argTab,this.cardContainer.items.length - 1);
        tmpToolbarItem.pressed = true;
        this.toolbar.add(tmpToolbarItem);
        }
        this.setSelectedIndex(this.cardContainer.items.length - 1,false);
    },

    unToggleSelectedToolbarButton: function(){
        if( this.selectedIndex < 0 || Ext.isEmpty(this.toolbar.items) ){
            return;
        }
        var tmpSelectedToolbarButton = this.toolbar.items.findBy(function(argItem){
            if(argItem.tabIndex === this.selectedIndex){
                return true;
            }
            return false;
        },this);
        if( Ext.isEmpty(tmpSelectedToolbarButton) ){
            return;
        }
        tmpSelectedToolbarButton.toggle(false);

    },

    hideTabBar: function(){
        this.toolbar.setVisible(false);
    },

    showTabBar: function(){
        this.toolbar.setVisible(true);
    },

    addAll: function(argTabs){
        if( Ext.isEmpty(argTabs) ){
            return;
        }
        for (var tmpIndex = 0; tmpIndex < argTabs.length; tmpIndex++) {
            var tmpTab = argTabs[tmpIndex];
            this.addTab(tmpTab);
        }
    },

    removeAll: function(){
        this.toolbar.removeAll();
        this.cardContainer.removeAll();
    }

});
Ext.define('Mercury.ux.data.RestJsonReader', {

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
            Mercury.core.ErrorsManager.handleSimpleErrorByCode(tmpData.error);
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
Ext.define('Mercury.ux.data.RestProxy',{
	
	extend: 'Ext.data.proxy.Rest',
	alias: 'proxy.restproxy',

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
        Ext.apply(this.headers,Mercury.ux.data.RestProxy.currentHeaders);
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
        if(argResponse.status === Mercury.core.Defaults.RESPONSE_STATUS_SERVICE_NOT_AVAILABLE){
            var tmpErrorMessage = Mercury.core.Defaults.SIMPLE_ERROR_WEBSERVICE_NOT_AVAILABLE;
            Mercury.core.ErrorsManager.handleSimpleError(tmpErrorMessage);
        }
        if(argResponse.status === Mercury.core.Defaults.RESPONSE_STATUS_REQUESTED_URL_NOT_FOUND_ON_SERVER){
            var tmpErrorMessage = Mercury.core.Defaults.SIMPLE_ERROR_REQUESTED_URL_NOT_FOUND_ON_SERVER;
            Mercury.core.ErrorsManager.handleSimpleError(tmpErrorMessage);
        }
        this.callParent(arguments);
    }

});
Ext.define('Mercury.ux.form.AutoCompleteBox',{
	
	extend: 'Ext.form.field.Picker',
	alias: 'widget.autocompletebox',

    hideTrigger: true,
    searchTask: null,
    store: undefined,
    displayField: "name",

    defaultListConfig: {
        loadingHeight: 70,
        minWidth: 70,
        maxHeight: 300,
        shadow: 'sides'
    },

    viewTpl: undefined,

    createPicker: function() {
        var tmpView = Ext.create('Ext.view.BoundList', {
            store: this.store,
            selModel: {
                mode: 'SINGLE'
            },
            displayField: this.displayField,
            focusOnToFront: false,
            tpl: this.viewTpl,
            pickerField: this,
            ownerCt: this.ownerCt,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            loadingHeight: 70,
            minWidth: 70,
            maxHeight: 300,
            shadow: 'sides'
        });

        this.mon(tmpView, {
            itemclick: this.onItemClick,
            scope: this
        });

        return tmpView;
    },

    onItemClick: function(argPickerView, argRecord){
        var tmpValue = argRecord.get(this.displayField);
        this.suspendEvents(false);
        this.setValue(tmpValue);
        this.collapse();
        this.resumeEvents();
    },

    initComponent: function(){
        this.searchTask = new Ext.util.DelayedTask(this.fireSearchEvent,this);
        this.addListener('change',this.onSearchChange,this);
        this.viewTpl = new Ext.XTemplate(
            '<ul>'+
                '<tpl for=".">' +
                    '<li class="x-boundlist-item" role="option">{' + this.displayField + '}</li>'+
                '</tpl>'+
            '</ul>'
        );
        this.callParent(arguments);
    },

    onSearchChange: function(){
        this.searchTask.cancel();
        this.searchTask.delay(500);
    },

    fireSearchEvent: function(){
        this.fireEvent('executeSearch',this.getValue());
    }

});
Ext.define('Mercury.ux.form.DoubleEnhancedDatePicker', {

    extend: 'Ext.container.Container',
    alias: 'widget.doubleenhanceddatepicker',
    layout: 'column',
    dateFormat: 'YYYY-m-d',
    xDatePickerSelected: 'x-datepicker-selected',
    initComponent:function () {
        this.addListener('afterrender',this.onAfterRender,this);
        this.items = [
            {
                xtype: 'enhanceddatepicker',
                itemId: 'currentMonth',
                showToday: false,
                showNextMonthButton: false,
                showMonthPickerToolTip: false,
                listeners: {
                    scope: this,
                    showPrevMonthClick: this.onShowPrevMonthClick,
                    select: this.onDayMonthSelected
                }
            },
            {
                xtype: 'enhanceddatepicker',
                itemId: 'nextMonth',
                showToday: false,
                showPrevMonthButton: false,
                showMonthPickerToolTip: false,
                listeners: {
                    scope: this,
                    showNextMonthClick: this.onShowNextMonthClick,
                    select: this.onDayMonthSelected
                }
            }
        ];
        this.callParent()
    },

    onAfterRender: function() {
        var tmpNextMonth = this.getNextMonth();
        var tmpDate = Ext.Date.add(new Date(), Ext.Date.MONTH, 1);
        tmpNextMonth.setValue(tmpDate);
        tmpNextMonth.removeDateClass(tmpNextMonth.getValue(),this.xDatePickerSelected);
    },

    setValue: function(argDate){
        var tmpNextMonth = this.getNextMonth();
        var tmpCurrentMonth = this.getCurrentMonth();
        tmpCurrentMonth.setValue(argDate)
        var tmpDate = Ext.Date.add(tmpCurrentMonth.getValue(), Ext.Date.MONTH, 1);
        tmpNextMonth.setValue(tmpDate);
        tmpNextMonth.removeDateClass(tmpNextMonth.getValue(),this.xDatePickerSelected);
    },

    onRemoveNextMonthNonActualDaySelected: function(){
        var tmpNextMonth = this.getNextMonth();
        var tmpNextMonthDate = Ext.Date.format(tmpNextMonth.getValue(), this.dateFormat);
        var tmpCurrentDate = Ext.Date.format(new Date(), this.dateFormat);
        if(tmpNextMonthDate == tmpCurrentDate){
            return;
        }
        tmpNextMonth.removeDateClass(tmpNextMonth.getValue(),this.xDatePickerSelected);
    },

    onRemoveCurrentMonthNonActualDaySelected: function(){
        var tmpCurrentMonth = this.getCurrentMonth();
        var tmpCurrentMonthDate = Ext.Date.format(tmpCurrentMonth.getValue(), this.dateFormat);
        var tmpCurrentDate = Ext.Date.format(new Date(), this.dateFormat);
        if(tmpCurrentMonthDate == tmpCurrentDate){
            return;
        }
        tmpCurrentMonth.removeDateClass(tmpCurrentMonth.getValue(),this.xDatePickerSelected);
    },

    onShowPrevMonthClick: function(){
        var tmpNextMonth = this.getNextMonth();
        tmpNextMonth.showPrevMonth();
        this.onRemoveNextMonthNonActualDaySelected();
        this.onRemoveCurrentMonthNonActualDaySelected();
        this.fireEvent('monthChanged', this.getCurrentMonth().getValue(), this.getNextMonth().getValue());
    },

    onShowNextMonthClick: function(){
        var tmpCurrentMonth = this.getCurrentMonth();
        tmpCurrentMonth.showNextMonth();
        this.onRemoveNextMonthNonActualDaySelected();
        this.onRemoveCurrentMonthNonActualDaySelected();
        this.fireEvent('monthChanged', this.getCurrentMonth().getValue(), this.getNextMonth().getValue());
    },

    onDayMonthSelected: function(argEvent, argDate){
        this.removeDuplicateSelectedDays(argDate);
        var tmpCurrentMonth = this.getCurrentMonth();
        var tmpNextMonth = this.getNextMonth();
        this.fireEvent('dayMonthSelected', this, argDate, tmpCurrentMonth, tmpNextMonth);
    },

    removeDuplicateSelectedDays: function(argDate) {
        var tmpCurrentMonth = this.getCurrentMonth();
        var tmpNextMonth = this.getNextMonth();
        var tmpCurrentMonthFormattedDate = Ext.Date.format(tmpCurrentMonth.getValue(), this.dateFormat);
        var tmpSelectedDate = Ext.Date.format(argDate, this.dateFormat);
        if(tmpCurrentMonthFormattedDate == tmpSelectedDate){
            tmpNextMonth.removeDateClass(tmpNextMonth.getValue(),this.xDatePickerSelected);
            return;
        }
        tmpCurrentMonth.removeDateClass(tmpCurrentMonth.getValue(),this.xDatePickerSelected);
    },

    onSetMonthsDateClass: function(argDate, argClass){
        var tmpNextMonth = this.getNextMonth();
        tmpNextMonth.setDateClass(argDate,argClass);
        var tmpCurrentMonth = this.getCurrentMonth();
        tmpCurrentMonth.setDateClass(argDate,argClass);
    },

    getCurrentMonth: function(){
        return this.down('enhanceddatepicker[itemId=currentMonth]');
    },

    getNextMonth: function(){
        return this.down('enhanceddatepicker[itemId=nextMonth]');
    }
});
Ext.define('Mercury.ux.form.EnhancedDatePicker', {

    extend: 'Ext.picker.Date',
    alias: 'widget.enhanceddatepicker',

    yearMonthDictionary: undefined,
    testVar: "test1",
    selectedCell: undefined,
    showPrevMonthButton: true,
    showNextMonthButton: true,
    showMonthPickerToolTip: true,
    monthYearText : 'Choose a month (Control+Up/Down to move years)',
    renderTpl: [
        '<div id="{id}-innerEl" role="grid">',
        '<div role="presentation" class="{baseCls}-header">',
        // the href attribute is required for the :hover selector to work in IE6/7/quirks
        '<tpl if="showPrevMonthButton">',
        '<a id="{id}-prevEl" class="{baseCls}-prev {baseCls}-arrow" href="#" role="button" title="{prevText}" hidefocus="on" ></a>',
        '</tpl>',
        '<tpl if="showPrevMonthButton == false">',
        '<a id="{id}-prevEl" class="{baseCls}-prev {baseCls}-arrow" href="#" role="button" title="{prevText}" hidefocus="on" style="visibility: hidden"></a>',
        '</tpl>',
        '<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
        // the href attribute is required for the :hover selector to work in IE6/7/quirks
        '<tpl if="showNextMonthButton">',
        '<a id="{id}-nextEl" class="{baseCls}-next {baseCls}-arrow" href="#" role="button" title="{nextText}" hidefocus="on" ></a>',
        '</tpl>',
        '<tpl if="showNextMonthButton == false">',
        '<a id="{id}-nextEl" class="{baseCls}-next {baseCls}-arrow" href="#" role="button" title="{nextText}" hidefocus="on" style="visibility: hidden"></a>',
        '</tpl>',
        '</div>',
        '<table id="{id}-eventEl" class="{baseCls}-inner" cellspacing="0" role="presentation">',
        '<thead role="presentation"><tr role="presentation">',
        '<tpl for="dayNames">',
        '<th role="columnheader" class="{parent.baseCls}-column-header" title="{.}">',
        '<div class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
        '</th>',
        '</tpl>',
        '</tr></thead>',
        '<tbody role="presentation"><tr role="presentation">',
        '<tpl for="days">',
        '{#:this.isEndOfWeek}',
        '<td role="gridcell" id="{[Ext.id()]}">',
        // the href attribute is required for the :hover selector to work in IE6/7/quirks
        '<a role="presentation" hidefocus="on" class="{parent.baseCls}-date" href="#"></a>',
        '</td>',
        '</tpl>',
        '</tr></tbody>',
        '</table>',
        '<tpl if="showToday">',
        '<div id="{id}-footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
        '</tpl>',
        '</div>',
        {
            firstInitial: function(value) {
                return Ext.picker.Date.prototype.getDayInitial(value);
            },
            isEndOfWeek: function(value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            }
        }
    ],

    beforeRender: function () {
        /*
         * days array for looping through 6 full weeks (6 weeks * 7 days)
         * Note that we explicitly force the size here so the template creates
         * all the appropriate cells.
         */
        var me = this,
            days = new Array(me.numDays),
            today = Ext.Date.format(new Date(), me.format);

        // If there's a Menu among our ancestors, then add the menu class.
        // This is so that the MenuManager does not see a mousedown in this Component as a document mousedown, outside the Menu
        if (me.up('menu')) {
            me.addCls(Ext.baseCSSPrefix + 'menu');
        }

        me.monthBtn = new Ext.button.Button({
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            text: '',
            tooltip: me.monthYearText,
            listeners: {
                click: me.showMonthPicker,
                arrowclick: me.showMonthPicker,
                scope: me
            }
        });

        if(!me.showMonthPickerToolTip) {
            me.monthYearText = ''
        }

        if (me.showToday) {
            me.todayBtn = new Ext.button.Button({
                ownerCt: me,
                ownerLayout: me.getComponentLayout(),
                text: Ext.String.format(me.todayText, today),
                tooltip: Ext.String.format(me.todayTip, today),
                tooltipType: 'title',
                handler: me.selectToday,
                scope: me
            });
        }

        me.callParent();

        Ext.applyIf(me, {
            renderData: {}
        });

        Ext.apply(me.renderData, {
            dayNames: me.dayNames,
            showToday: me.showToday,
            prevText: me.prevText,
            nextText: me.nextText,
            showPrevMonthButton: me.showPrevMonthButton,
            showNextMonthButton: me.showNextMonthButton,
            days: days
        });

        me.protoEl.unselectable();
    },

    showMonthPicker : function(animate){
        if(!this.showMonthPickerToolTip) {
            return;
        }
        var me = this,
            picker;

        if (me.rendered && !me.disabled) {
            picker = me.createMonthPicker();
            picker.setValue(me.getActive());
            picker.setSize(me.getSize());
            picker.setPosition(-1, -1);
            if (me.shouldAnimate(animate)) {
                me.runAnimation(false);
            } else {
                picker.show();
            }
        }
        return me;
    },

    fullUpdate: function(argDate){
        this.callParent(arguments);
        this.testVar = "test2";
        this.storeOriginalYearMonthClassNames();
        this.addCurrentYearMonthClasses();
        this.addSelectedCellClass();
    },

    storeOriginalYearMonthClassNames: function(){
        var tmpCells = this.cells.elements;
        for(var tmpIndex=0; tmpIndex < this.numDays;tmpIndex++) {
            var tmpCell = tmpCells[tmpIndex];
            var tmpCellDate = new Date(tmpCell.title);
            if(tmpCell.title === this.todayText){
                tmpCellDate = new Date();
            }
            var tmpClassName = tmpCell.className;
            if( this.isCellSelected(tmpCell) ){
                this.selectedCell = tmpCell;
                tmpClassName = tmpCell.className.replace("x-datepicker-selected","");
            }
            this.storeYearMonthClassName(tmpCellDate,'originalClassName',tmpClassName);
        }
    },

    isCellSelected: function(argCell){
        if( Ext.isEmpty(argCell) ){
            return false;
        }
        if( argCell.className.indexOf('x-datepicker-selected') >= 0 ){
            return true;
        }
        return false;
    },

    storeYearMonthClassName: function(argDate,argField,argClassName){
        if( Ext.isEmpty(argDate) || Ext.isEmpty(argField) ){
            return;
        }
        if( Ext.isEmpty(this.yearMonthDictionary) ){
            this.yearMonthDictionary = {};
        }
        var tmpMonthYearKey = argDate.getFullYear() + "-" + argDate.getMonth();
        var tmpYearMonthValues = this.yearMonthDictionary[tmpMonthYearKey];
        if( Ext.isEmpty(tmpYearMonthValues) ){
            tmpYearMonthValues = {};
        }
        var tmpValue = tmpYearMonthValues[argDate.getDate()];
        if( Ext.isEmpty(tmpValue) ){
            tmpValue = {};
        }
        tmpValue[argField] = argClassName;
        tmpYearMonthValues[argDate.getDate()] = tmpValue;
        this.yearMonthDictionary[tmpMonthYearKey] = tmpYearMonthValues;
    },

    setDateClass: function(argDate,argClass){
        if( Ext.isEmpty(argDate) ){
            return;
        }
        var tmpYearMonthKey = argDate.getFullYear() + "-" + argDate.getMonth();
        this.storeYearMonthClassName(argDate,'newClassName',argClass);
        this.addCurrentYearMonthClasses();
    },

    removeDateClass: function(argDate,argClass){
        var tmpCell = this.getCellByDate(argDate);
        var tmpNewClassName = tmpCell.className.replace(argClass,"");
        tmpCell.className = tmpNewClassName;
    },

    getCellByDate: function(argDate){
        if( Ext.isEmpty(argDate) ){
            return null;
        }
        var tmpCells = this.cells.elements;
        for(var tmpIndex=0; tmpIndex < this.numDays;tmpIndex++) {
            var tmpCell = tmpCells[tmpIndex];
            var tmpCellDate = new Date(tmpCell.title);
            if(tmpCell.title === this.todayText){
                tmpCellDate = new Date();
            }
            if( argDate.toDateString() === tmpCellDate.toDateString() ){
                return tmpCell;
            }
        }
        return null;
    },

    addCurrentYearMonthClasses: function(){
        var tmpCells = this.cells.elements;
        for(var tmpIndex=0; tmpIndex < this.numDays;tmpIndex++) {
            var tmpCell = tmpCells[tmpIndex];
            var tmpCellDate = new Date(tmpCell.title);
            if(tmpCell.title === this.todayText){
                tmpCellDate = new Date();
            }
            var tmpValue = this.getYearMonthValueByDate(tmpCellDate);
            if( tmpValue.newClassName === null || tmpValue.newClassName === undefined ){
                continue;
            }
            var tmpNewClassName = tmpValue.originalClassName + " " + tmpValue.newClassName;
            if( tmpNewClassName !== tmpCell.className ){
                tmpCell.className = tmpNewClassName;
            }
        }
    },

    getYearMonthValueByDate: function(argDate){
        if( Ext.isEmpty(argDate) ){
            return;
        }
        var tmpMonthYearKey = argDate.getFullYear() + "-" + argDate.getMonth();
        var tmpYearMonthValues = this.yearMonthDictionary[tmpMonthYearKey];
        if( Ext.isEmpty(tmpYearMonthValues) ){
            return null;
        }
        return tmpYearMonthValues[argDate.getDate()];
    },

    addSelectedCellClass: function(){
        if( this.selectedCell.className.indexOf('x-datepicker-selected') >= 0 ){
            return;
        }
        this.selectedCell.className = this.selectedCell.className + " x-datepicker-selected";
    },

    showPrevMonth : function(e){
        this.callParent(arguments);
        this.fireEvent('showPrevMonthClick');
    },

    showNextMonth : function(e){
        this.callParent(arguments);
        this.fireEvent('showNextMonthClick');
    }

});
Ext.define('Mercury.ux.form.FormContainer',{
	
	extend: 'Ext.container.Container',
	alias: 'widget.formcontainer',
    requires: [
        'Ext.form.Basic'
    ],
    mixins: {
        fieldAncestor: 'Ext.form.FieldAncestor'
    },

    layout: 'anchor',
    ariaRole: 'form',
    form: undefined,

    modelClassName: undefined,

    initComponent: function(){
        if( Ext.isEmpty(this.modelClassName) ){
            throw new Error('FormContainer->initComponent(): A valid model must be specifed when using a FormContainer');
        }
        this.initFieldAncestor();
        this.callParent(arguments);
        this.relayEvents(this.getForm(), [
            'beforeaction',
            'actionfailed',
            'actioncomplete',
            'validitychange',
            'dirtychange'
        ]);
    },

    initItems: function() {
        this.callParent();
        this.form = this.createForm();
    },

    createForm: function() {
        return new Ext.form.Basic(this);
    },

    afterFirstLayout: function() {
        this.callParent();
        this.getForm().initialize();
        this.initModel();
    },

    initModel: function(){
        var tmpModelClass = Ext.ModelManager.getModel(this.modelClassName);
        if( Ext.isEmpty(tmpModelClass) ){
            throw new Error('FormContainer->initModel(): A valid model must be specifed when using a FormContainer');
        }
        var tmpModelInstance = new tmpModelClass();
        this.loadRecord(tmpModelInstance);
    },

    getForm: function() {
        return this.form;
    },

    loadRecord: function(argRecord) {
        return this.getForm().loadRecord(argRecord);
    },

    getRecord: function() {
        var tmpRecord = this.getForm().getRecord();
        this.getForm().updateRecord(tmpRecord);
        return tmpRecord;
    },

    getValues: function(asString, dirtyOnly, includeEmptyText, useDataValues) {
        return this.getForm().getValues(asString, dirtyOnly, includeEmptyText, useDataValues);
    },

    isDirty: function () {
        return this.getForm().isDirty();
    },

    isValid: function () {
        var tmpRecord = this.getRecord();
        var tmpErrors = tmpRecord.validate();
        if( !Ext.isEmpty(tmpErrors.items) ){
            this.getForm().markInvalid(tmpErrors);
            return false;
        }
        return true;
    },

    hasInvalidField: function () {
        return this.getForm().hasInvalidField();
    },

    beforeDestroy: function() {
        this.getForm().destroy();
        this.callParent();
    },

    checkChange: function() {
        var tmpFields = this.getForm().getFields().items;
        var tmpIndex = 0;
        var tmpLength = tmpFields.length;
        for (; tmpIndex < tmpLength; tmpIndex++) {
            tmpFields[tmpIndex].checkChange();
        }
    }

});
Ext.define('Mercury.ux.popup.ErrorWindow',{
	
	extend: 'Ext.window.Window',
	alias: 'widget.errorwindow',
	resizable: false,
	modal: true,
	closable: true,
	width: 350,
	height: 200,
	layout: 'fit',
	
	/**
	 * Error message to be displayed
	 */
	errorMessage: "",
	
	initComponent: function(){
		this.items = [
			{
				xtype: 'textarea',
				editable: false,
				value: this.errorMessage
			}
		];
		this.callParent(arguments);
	}
	
});
/**
 * This class fix an nullPointer exception when using ghost panels with no header
 */
Ext.define('Mercury.ux.util.EnhancedComponentDragger',{
	
	extend: 'Ext.util.ComponentDragger',
	alias: 'widget.enhancedcomponentdragger',
	
	onStart: function(e){
		var me = this,
		comp = me.comp;
		this.startPosition = comp.getPosition();
		if (comp.ghost && !comp.liveDrag) {
			me.proxy = comp.ghost();
			if(me.proxy.header){
				me.dragTarget = me.proxy.header.el;
			}
		}
		if (me.constrain || me.constrainDelegate) {
			me.constrainTo = me.calculateConstrainRegion();
		}
	}
	
});
Ext.define('Mercury.ux.view.BaseViewsContainer', {

    extend: 'Ext.container.Container',
    alias: 'widget.baseviewscontainer',

    viewModels: undefined,
    viewsWrapper: undefined,
    currentView: undefined,

    initComponent: function () {
        this.items = this.getItems();
        this.assignViewsWrapper();
        this.callParent(arguments);
    },

    assignViewsWrapper: function () {
    },

    getItems: function () {
        return null;
    },

    displayViewByViewModel: function (argViewModel) {
        var tmpView = this.createViewFromViewModel(argViewModel);
        if (Ext.isEmpty(tmpView)) {
            return;
        }
        this.displayView(tmpView);
    },

    createViewFromViewModel: function (argViewItem) {
        if (Ext.isEmpty(argViewItem)) {
            return null;
        }
        var tmpView = null;
        if (!Ext.isEmpty(argViewItem.get('iframe'))) {
            tmpView = this.createIframeView(argViewItem.get('label'), argViewItem.get('iframe'));
        } else if (!Ext.isEmpty(argViewItem.get('package'))) {
            tmpView = Ext.create(argViewItem.get('package'));
        } else if (!Ext.isEmpty(argViewItem.get('xtype'))) {
            tmpView = Ext.createByAlias("widget." + argViewItem.get('xtype'));
        }
        return tmpView;
    },

    createIframeView: function (argTitle, argIframe) {
        var tmpIFrameView = Ext.create('Mercury.ux.container.IFrameContainer', {
            title: argTitle,
            iframeSrc: argIframe
        });
        return tmpIFrameView;
    },

    displayView: function (argView) {
        if (Ext.isEmpty(argView)) {
            return;
        }
        this.removeCurrentViewFromWrapper();
        this.viewsWrapper.add(argView);
        this.currentView = argView;
    },

    removeCurrentViewFromWrapper: function () {
        if (Ext.isEmpty(this.currentView)) {
            return;
        }
        this.viewsWrapper.remove(this.currentView, true);
    },

    reconfigureViews: function (argViewModels) {
        if (Ext.isEmpty(argViewModels)) {
            return;
        }
        this.currentView = null;
        this.viewModels = argViewModels;
        this.removeAllViewsFromWrapper();
    },

    removeAllViewsFromWrapper: function () {
        this.viewsWrapper.removeAll(true);
    }

});


Ext.define('Mercury.ux.view.SimpleViewsContainer',{
	
	extend: 'Mercury.ux.view.BaseViewsContainer',
	alias: 'widget.simpleviewscontainer',

    assignViewsWrapper: function(){
        this.viewsWrapper = this;
    }

});
Ext.define('Mercury.ux.view.CardViewsContainer',{
	
	extend: 'Mercury.ux.view.BaseViewsContainer',
	alias: 'widget.cardviewscontainer',

    viewInstancesByName: {},

    initComponent: function(){
        this.layout = 'card';
        this.callParent(arguments);
    },

    assignViewsWrapper: function(){
        this.viewsWrapper = this;
    },

    createViewFromViewModel: function(argViewModel){
        if( Ext.isEmpty(argViewModel) ){
            return null;
        }
        var tmpView = this.viewInstancesByName[argViewModel.get('name')];
        if( !Ext.isEmpty(tmpView) ){
            return tmpView;
        }
        tmpView = this.callParent(arguments);
        this.viewInstancesByName[argViewModel.get('name')] = tmpView;
        return tmpView;
    },

    displayView: function(argView){
        if( Ext.isEmpty(argView) ){
            return;
        }
        if( Ext.isEmpty(argView.addedToWrapper) || argView.addedToWrapper === false ){
            this.viewsWrapper.add(argView);
            argView.addedToWrapper = true;
        }
        var tmpCardLayout = this.viewsWrapper.getLayout();
        tmpCardLayout.setActiveItem(argView);
        this.currentView = argView;
    },

    reconfigureViews: function(argViewModels){
        this.callParent(arguments);
        this.viewInstancesByName = {};
    }

});
Ext.define('Mercury.ux.view.TabViewsContainer',{
	
	extend: 'Mercury.ux.view.BaseViewsContainer',
	alias: 'widget.tabviewscontainer',

    tabContainer: undefined,

    assignViewsWrapper: function () {
        this.viewsWrapper = this.tabContainer;
    },

    getItems: function(){
        this.tabContainer = this.getTabContainer();
        return [
            this.tabContainer
        ];
    },

    getTabContainer: function(){
        var tmpTabContainerItems = this.getTabContainerItemsBasedOnViewModels();
        var tmpTabContainer = Ext.create('Mercury.ux.container.TabContainer',{
            cls: 'tab-views-container-tab-container',
            cardContainerCls: 'tab-views-container-tab-container-content-area',
            items: tmpTabContainerItems
        });
        tmpTabContainer.addListener('tabchange',this.onTabChange);
        return tmpTabContainer;
    },

    onTabChange: function(argTabIndex,argTab){
        if( Ext.isEmpty(argTab) ){
            return;
        }
        Ext.util.History.add(argTab.itemId);
    },

    getTabContainerItemsBasedOnViewModels: function(){
        if( Ext.isEmpty(this.viewModels) ){
            return null;
        }
        var tmpTabContainerItems = [];
        var tmpIndex = 0,tmpLength = this.viewModels.length;
        for(;tmpIndex < tmpLength;tmpIndex++){
            var tmpViewModel = this.viewModels[tmpIndex];
            var tmpTabContainerItem = this.getTabContainerItemBasedOnViewModel(tmpViewModel);
            if( !Ext.isEmpty(tmpTabContainerItem) ){
                tmpTabContainerItems.push(tmpTabContainerItem);
            }
        }
        return tmpTabContainerItems;
    },

    getTabContainerItemBasedOnViewModel: function(argViewModel){
        if( Ext.isEmpty(argViewModel) ){
            return null;
        }
        var tmpTabContainerItemConfig = {
            title: argViewModel.get('label'),
            itemId: argViewModel.get('name'),
            iframe: argViewModel.get('iframe'),
            includeInToolbar: argViewModel.get('includeInTabs')
        };
        if( !Ext.isEmpty(argViewModel.get('xtype')) ){
            tmpTabContainerItemConfig.xtype = argViewModel.get('xtype');
            return tmpTabContainerItemConfig;
        }
        if( !Ext.isEmpty(argViewModel.get('package')) ){
            var tmpTabContainerItemInstance = Ext.create(argViewModel.get('package'),tmpTabContainerItemConfig);
            tmpTabContainerItemInstance.includeInToolbar = argViewModel.get('includeInTabs');
            return tmpTabContainerItemInstance;
        }
        return tmpTabContainerItemConfig;
    },

    displayViewByViewModel: function(argViewModel){
        if( Ext.isEmpty(argViewModel) || Ext.isEmpty(this.viewModels) ){
            return;
        }
        var tmpViewIndex = this.viewModels.indexOf(argViewModel);
        this.tabContainer.setSelectedIndex(tmpViewIndex);
    },

    addView: function(argViewModel){
        if( Ext.isEmpty(argViewModel) ){
            return;
        }
        if( Ext.isEmpty(this.viewModels) ){
            this.viewModels = [];
        }
        var tmpViewIndex = this.viewModels.indexOf(argViewModel);
        if( tmpViewIndex > -1 ){
            this.displayViewByViewModel(argViewModel);
            return;
        }
        this.viewModels.push(argViewModel);
        var tmpTabItem = this.getTabContainerItemBasedOnViewModel(argViewModel);
        this.tabContainer.addTab(tmpTabItem);
    },

    hideTabBar: function(){
        this.tabContainer.hideTabBar();
    },

    showTabBar: function(){
        this.tabContainer.showTabBar();
    },

    reconfigureViews: function(argViewModels){
        this.callParent(arguments);
        var tmpTabContainerItems = this.getTabContainerItemsBasedOnViewModels();
        this.tabContainer.addAll(tmpTabContainerItems);
    },

    removeAll: function(){
        this.viewsWrapper.removeAll();
    }

});
Ext.define('Mercury.ux.view.TreeViewsContainer', {

    extend: 'Mercury.ux.view.BaseViewsContainer',

    alias: 'widget.treeviewscontainer',
    layout: 'column',

    treePanel: undefined,
    contentArea: undefined,
    selectedViewId: undefined,

    assignViewsWrapper: function () {
        this.viewsWrapper = this.contentArea;
    },

    displayViewByViewModel: function(argViewModel){
        this.contentArea.displayViewByViewModel(argViewModel);
        this.selectedViewId = argViewModel.get('id');
        this.markSelectedViewInTree();
    },

    markSelectedViewInTree: function(){
        if( Ext.isEmpty(this.selectedViewId) || !this.treePanel.isVisible() ){
            return;
        }
        var tmpTreeStore = this.treePanel.store;
        var tmpViewRecord = tmpTreeStore.getNodeById(this.selectedViewId);
        if( Ext.isEmpty(tmpViewRecord) ){
            return;
        }
        this.treePanel.selectPath(tmpViewRecord.getPath());
    },

    getItems: function () {
        this.treePanel = this.createTreePanel();
        this.contentArea = this.createContentArea();
        return [
            this.treePanel,
            this.contentArea
        ];
    },

    createTreePanel: function () {
        var tmpTreeStoreItems = this.getTreeStoreItemsBasedOnViewModels(this.viewModels);
        var tmpStore = Ext.create('Ext.data.TreeStore', {
            fields: [
                {name: 'pageName'},
                {name: 'text'}
            ],
            root: {
                children: tmpTreeStoreItems
            }
        });
        var tmpTreePanel = Ext.create('Ext.tree.Panel', {
            title: 'Views',
            cls: 'tree-views-container-tree-panel',
            columnWidth: 0.20,
            store: tmpStore,
            rootVisible: false,
            listeners: {
                scope: this,
                afterrender: this.onTreePanelAfterRender,
                select: this.onTreeItemSelected
            }
        });
        return tmpTreePanel;
    },

    onTreePanelAfterRender: function(){
        this.markSelectedViewInTree();
    },

    getTreeStoreItemsBasedOnViewModels: function(argViews){
        if( Ext.isEmpty(argViews) ){
            return null;
        }
        var tmpTreeStoreItems = [];
        for( var tmpIndex=0;tmpIndex < argViews.length;tmpIndex++ ){
            var tmpViewModel = argViews[tmpIndex];
            if( tmpViewModel.get('includeInTree') === false ){
                continue;
            }
            var tmpTreeStoreItem = this.getTreeStoreItemBasedOnViewModel(tmpViewModel);
            tmpTreeStoreItems.push(tmpTreeStoreItem);
        }
        return tmpTreeStoreItems;
    },

    getTreeStoreItemBasedOnViewModel: function(argViewModel){
        if( Ext.isEmpty(argViewModel) ){
            return null;
        }
        var tmpIsLeaf = false;
        if( Ext.isEmpty(argViewModel.get("children")) ){
            tmpIsLeaf = true;
        }
        var tmpTreeStoreItem = {
            id: argViewModel.get('id'),
            text: argViewModel.get('label'),
            pageName: argViewModel.get('name'),
            leaf: tmpIsLeaf,
            children: this.getTreeStoreItemsBasedOnViewModels(argViewModel.get("children"))
        };
        return tmpTreeStoreItem;
    },

    createContentArea: function(){
        var tmpContentArea = Ext.create('Mercury.ux.view.CardViewsContainer',{
            cls: 'tree-views-container-content-area',
            columnWidth: 0.80
        });
        return tmpContentArea;
    },

    hideTree: function(){
        this.treePanel.setVisible(false);
        this.contentArea.columnWidth = 1;
    },

    showTree: function(){
        this.treePanel.setVisible(true);
        this.contentArea.columnWidth = 0.80;
    },

    onTreeItemSelected: function(argRowSelectionModel,argRecord,argIndex){
        var isLeaf = argRecord.get('leaf');
        if( !isLeaf ){
            return;
        }
        Mercury.core.EventBus.fireEvent(Mercury.core.Events.EVENT_SHOW_PAGE, argRecord.get('pageName'));
    },

    reconfigureViews: function(argViewModels){
        this.callParent(arguments);
        this.selectedViewId = null;
        var tmpTreeStoreItems = this.getTreeStoreItemsBasedOnViewModels(this.viewModels);
        this.treePanel.store.setRootNode({
            children: tmpTreeStoreItems
        });
    }

});
Ext.define('Mercury.ux.view.TreeTabViewsContainer', {

    extend: 'Mercury.ux.view.TreeViewsContainer',

    alias: 'widget.treetabviewscontainer',

    createContentArea: function(){
        var tmpContentArea = Ext.create('Mercury.ux.view.TabViewsContainer',{
            cls: 'tree-tab-views-container-content-area',
            columnWidth: 0.80
        });
        return tmpContentArea;
    },

    displayViewByViewModel: function(argViewModel){
        this.contentArea.addView(argViewModel);
        this.selectedViewId = argViewModel.get('id');
        this.markSelectedViewInTree();
    },

    hideTree: function(){
        this.callParent(arguments);
        this.contentArea.hideTabBar();
    },

    showTree: function(){
        this.callParent(arguments);
        this.contentArea.showTabBar();
    },

    reconfigureViews: function(argViewModels){
        this.callParent(arguments);
        this.viewsWrapper.currentView = null;
        this.viewsWrapper.viewModels = [];
    }

});
/**
 * This the main class for the Mercury framework
 */
Ext.define('Mercury.Main', {

    singleton:true,

    requires:[
        'Ext.util.History',
        'Ext.state.CookieProvider',
        'Ext.state.Manager',
        'Ext.util.Cookies'
    ],

    callback:undefined,
    scope:this,
    localizationManagement: {
        enabled: false
    },
    errorsManagement: {
        enabled: false
    },
    viewsManagement: {
        enabled: false
    },

    init:function (argConfig) {
        Ext.apply(this, argConfig);
        this.initStateManager();
        this.initHistorySupport();
    },

    initStateManager: function(){
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    },

    initHistorySupport: function(){
        Ext.util.History.init(this.onHistoryInitiated,this);
    },

    onHistoryInitiated: function(){
        this.validateLocalizationManagement();
    },

    validateLocalizationManagement:function () {
        if( !this.localizationManagement.enabled ){
            this.validateViewsManagement();
            return;
        }
        Mercury.core.LocalizationManager.init({
            scope:this,
            callback:this.onLocalizationInitialized,
            enabled: this.localizationManagement.enabled,
            filesBaseUrls: this.localizationManagement.filesBaseUrls
        });
    },

    onLocalizationInitialized:function () {
        this.validateErrorsManagement();
    },

    validateErrorsManagement: function(){
        if( !this.errorsManagement.enabled ){
            this.validateViewsManagement();
            return;
        }
        Mercury.core.ErrorsManager.init({
            enabled: this.errorsManagement.enabled,
            errorCodesClass: this.errorsManagement.errorCodesClass
        });
        this.validateViewsManagement();
    },

    validateViewsManagement: function(){
        if( !this.viewsManagement.enabled ){
            Mercury.util.ObjectUtil.runCallback(this.callback,this.scope,null,false);
            return;
        }
        this.viewsManagement.scope = this;
        this.viewsManagement.callback = this.onViewsManagerInitiated;
        Mercury.core.ViewsManager.init(this.viewsManagement);
    },

    onViewsManagerInitiated: function(){
        Mercury.util.ObjectUtil.runCallback(this.callback,this.scope,null,false);
    }

});
})();