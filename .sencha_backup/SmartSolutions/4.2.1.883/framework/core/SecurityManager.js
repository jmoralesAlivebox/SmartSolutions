Ext.define('Framework.core.SecurityManager', {

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
