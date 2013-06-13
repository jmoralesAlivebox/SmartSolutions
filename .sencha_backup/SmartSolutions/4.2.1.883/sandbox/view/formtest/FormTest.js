Ext.define('TestModel', {

    extend:'Ext.data.Model',

    fields:[
        {
            name:'first',
            type:'string'
        },
        {
            name:'last',
            type:'string'
        }
    ],

    validations: [
        {
            type: 'presence',
            field: 'first'
        },
        {
            type: 'length',
            field: 'first',
            min: 3,
            message: 'First name must be at least 3 characters'
        },
        {
            type: 'presence',
            field: 'last',
            message: 'Last name is required'
        }
    ]

});

Ext.define('TestFormContainer',{

    extend: 'Framework.ux.form.FormContainer',
    alias: 'widget.testformcontainer',
    modelClassName: 'TestModel',

    itemId: 'testform',
    defaultType: 'textfield',
    items: [
        {
            fieldLabel: 'First Name',
            name: 'first'
        },
        {
            fieldLabel: 'Last Name',
            name: 'last'
        }
    ]

});

Ext.define('Sandbox.view.formtest.FormTest', {

    extend: 'Ext.container.Container',
    alias: 'widget.formtest',

    initComponent: function () {
        this.items = [
            {
                xtype: 'testformcontainer'
            },
            {
                xtype: 'button',
                text: 'Load Record',
                listeners: {
                    scope: this,
                    click: this.onLoadRecord
                }
            },
            {
                xtype: 'button',
                text: 'Save Record',
                listeners: {
                    scope: this,
                    click: this.onSaveRecord
                }
            }
        ];
        this.callParent(arguments);
    },

    onLoadRecord: function(){
        var tmpModel = Ext.create('TestModel');
        tmpModel.set('first','Test First Name');
        tmpModel.set('last','Test Last Name');
        var tmpForm = this.down("formcontainer[itemId=testform]");
        tmpForm.loadRecord(tmpModel);
    },

    onSaveRecord: function(){
        var tmpForm = this.down("formcontainer[itemId=testform]");
        if( tmpForm.isValid() ){
            console.log('Form.... is valid!!!');
            var tmpRecord = tmpForm.getRecord();
            console.log(tmpRecord.data);
        }else{
            console.log('Form.... is not valid!!!');
        }
    }

});