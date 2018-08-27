/**
 * @author Martí Pericay <marti@pericay.com>
 */

define(['bootstrap', 'typeahead'], function() {
    "use strict";
    	
    $.get( "data/projects.geojson", function( data ) {
        for (var i = 0; i < data.features.length; i+=1) {
            $("#results").append("<br>Distance to " + data.features[i].properties.description + ": " + distanceToPoly(point, data.features[i]) + " kms");
          }
      }, "json" );
    
    $("#searchBtn").on("click", function() {
        
        });
    

});