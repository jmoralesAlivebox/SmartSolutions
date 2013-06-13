/**
 * Utilitary class to help you to include very easy a drag selection to a specific component
 */
Ext.define('Framework.util.DragSelectionUtil', {
	
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
