Ext.define('Sandbox.view.autocompleteboxtest.AutoCompleteBoxTest', {

    extend:'Ext.container.Container',
    alias:'widget.autocompleteboxtest',

    initComponent:function () {

        Ext.define('Image', {
            extend: 'Ext.data.Model',
            fields: [
                { name:'name', type:'string' },
                { name:'value', type:'string' }
            ]
        });

        Ext.create('Ext.data.Store', {
            id:'imagesStore',
            model: 'Image',
            data: [
                { name:'Item 1', value:'1' },
                { name:'Item 2', value:'2' },
                { name:'Item 3', value:'3' },
                { name:'Item 4', value:'4' },
                { name:'Item 5', value:'5' },
                { name:'Item 6', value:'6' }
            ]
        });

        this.autoCompleteBox = Ext.create('Framework.ux.form.AutoCompleteBox',{
            fieldLabel: 'Autocomplete',
            displayField: 'name',
            store: Ext.data.StoreManager.lookup('imagesStore'),
            listeners: {
                scope: this,
                executeSearch: this.onExecuteSearch
            }
        });

        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"AL", "name":"Alabama"},
                {"abbr":"AK", "name":"Alaska"},
                {"abbr":"AZ", "name":"Arizona"}
                //...
            ]
        });

        this.items = [
            this.autoCompleteBox
        ];
        this.callParent(arguments);
    },

    onExecuteSearch: function(){
        console.log('Autocomplete test onExecuteSearch...');
        this.autoCompleteBox.expand();
    }

});