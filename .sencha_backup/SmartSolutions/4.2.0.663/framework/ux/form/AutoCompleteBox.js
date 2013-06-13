Ext.define('Framework.ux.form.AutoCompleteBox',{
	
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