/**
 * Utilitary class with helper methods needed to deal with styling, 
 *  here we handle styles validating the browser in which we are
 */
Ext.define('Framework.util.StylesUtil', {
	
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
