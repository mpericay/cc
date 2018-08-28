/**
 * @author Martí Pericay <marti@pericay.com>
 */

define([ 'turf', 'bootstrap'], function(turf) {
    "use strict";
    
    // ambits data
    var ambits;
    $.get( "data/ambits_cc.geojson", function( data ) {
        ambits = data;
      }, "json" );
    
    var printDistance = function(lat, lon) {
        // just an example
        var point = {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [(lat? lat : 0.966797), (lon ? lon : 29.085599)]
          }
        };    
        for (var i = 0; i < ambits.features.length; i+=1) {
                $("#results").append("<br>Distance to " + ambits.features[i].properties.description + ": " + distanceToPoly(point, ambits.features[i]) + " kms");
              }
    };
    
    var distanceToPoly = function(point, poly) {
        if(turf.booleanWithin(point, poly)) return 0;
        
        // distance
        var line = turf.polygonToLine(poly);
        //TODO: qué pasa si hay agujeros? polygonToLine devuelve FeatureCollection, y luego hacemos distancia a cada ring
        return turf.pointToLineDistance(point, line, {options: 'kilometers'});
    }
    
    var filterByTipus = function(value, pts) {
        var matchingPoints = turf.featurecollection([]);
        matchingPoints.features = pts.features.filter(function(pt) {
          if(pt.properties.tipus === value) return true
        })
        return matchingPoints;
    }
    
    return {
	   printDistance: function(lat, lon) {
			return printDistance(lat, lon);
       }
    }

});