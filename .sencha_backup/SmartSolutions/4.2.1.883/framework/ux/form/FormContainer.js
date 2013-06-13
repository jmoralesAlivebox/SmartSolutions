Ext.define('Framework.ux.form.FormContainer',{
	
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