/**
 * @author Martí Pericay <marti@pericay.com>
 */
define([], function() {
    "use strict";
    
    //Mode: retrieve projects data from Carto or from static GeoJSON in "data" folder?
    var mode = "carto";
    //var mode = "static";
    
    var cartoTable = 'cc_projects';
	var cartoUser = 'mcnb';
    
    return {
       getTable: function() {
            return cartoTable;
       },
       getUser: function() {
            return cartoUser;
       },
       getApi: function() {
            return 'http://' + cartoUser + '.carto.com/api/v2/sql?';
       },
       getMode: function() {
            return mode;
       },
    }
});