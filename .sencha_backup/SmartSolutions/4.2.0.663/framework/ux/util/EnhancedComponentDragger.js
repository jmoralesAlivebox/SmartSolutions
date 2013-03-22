/**
 * This class fix an nullPointer exception when using ghost panels with no header
 */
Ext.define('Framework.ux.util.EnhancedComponentDragger',{
	
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