/**
 * @author Martí Pericay <marti@pericay.com>
 */

define([ 'turf', 'bootstrap'], function(turf) {
    "use strict";
    	
	var params = {};
    location.search.substr(1).split("&").forEach(function(item) {
        var kv = item.split("=");
        params[kv[0]] = kv[1];
    });

    // for API
    var zoom = (params.hasOwnProperty('zoom') ? params.zoom : '3');
    var lat = (params.hasOwnProperty('lat') ? params.lat : '29.085599');
    var lon = (params.hasOwnProperty('lon') ? params.lon : '0.966797');
    
    var point = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [lon, lat]
      }
    };
    
    $.get( "data/ambits_cc.geojson", function( data ) {
        for (var i = 0; i < data.features.length; i+=1) {
            $("#results").append("<br>Distance to " + data.features[i].properties.description + ": " + distanceToPoly(point, data.features[i]) + " kms");
          }
      }, "json" );
    
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

});