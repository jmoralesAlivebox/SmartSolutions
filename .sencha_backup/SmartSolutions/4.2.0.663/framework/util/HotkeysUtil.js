/**
 * Utilitary class to map functions to specific keyboard keys
 */
Ext.define('Framework.util.HotkeysUtil', {
	
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
