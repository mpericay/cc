/**
 * @author Martí Pericay <marti@pericay.com>
 */

define([ 'lunr','turf', 'conf', 'bootstrap'], function(lunr, turf, conf) {
    "use strict";
    
    //index data
    var idx;
    
    // projects data
    var projectsById;
    
    // ambits data
    var ambits;
    
    $.get( "data/ambits_cc.geojson", function( data ) {
        ambits = data;
      }, "json" );
    
    var loadData = function(url, callback) {
        if (conf.getMode() == "carto") {
            url = conf.getApi() + "q=" + encodeURIComponent("SELECT * FROM " + conf.getTable()) + "&format=GeoJSON";
        }
        
        $.get( url, function( data ) {
                projectsById = data.features.reduce(function (acc, document) {
                    acc[document.properties.url_projecte] = document;
                    return acc;
                }, {});
                idx = lunr(function () {
                    this.ref('url_projecte')
                    this.field('nom_del_projecte')
                  
                    data.features.forEach(function(entry){
                        this.add(entry.properties);
                    }, this);
                    
            });
                
            if(callback instanceof Function) callback();
        
      }, "json" );

    };
    
    var distanceToPoly = function(point, poly) {
        if(turf.booleanWithin(point, poly)) return 0;
        
        // distance
        var line = turf.polygonToLine(poly);
        //TODO: qué pasa si hay agujeros? polygonToLine devuelve FeatureCollection, y luego hacemos distancia a cada ring
        return turf.pointToLineDistance(point, line, {options: 'kilometers'});
    }
    
    var filterByFV = function(field, value, pts) {
        if (!pts) return pts;
        if (!value) return pts;
        var matchingPoints = turf.featureCollection([]);
        matchingPoints.features = pts.filter(function(pt) {
            var proj = projectsById[pt.ref];
            if(proj.properties[field] === value) return true
        })
        return matchingPoints.features;
    }
    
    function orderByPosition(coords, points) {
        calculateDistance(coords, points);
        points.sort(compareDistance);
        return points;
    }
    
    function calculateDistance(coords, points) {
        var point = {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [coords.lon, coords.lat]
          }
        };
        
        for (var i = 0; i < points.length; i+=1) {
            var proj = projectsById[points[i].ref];
            //of course, provisional
            if (proj.properties.ambit_geografic == "Catalunya") {
               projectsById[points[i].ref].properties.distance = distanceToPoly(point, ambits.features[0]) + 20;
            } else if (proj.properties.ambit_geografic == "Espanya") {
               projectsById[points[i].ref].properties.distance = distanceToPoly(point, ambits.features[2]) + 25;
            } else if (proj.properties.ambit_geografic == "Mar Mediterrània") {
                projectsById[points[i].ref].properties.distance = distanceToPoly(point, ambits.features[1])
            } else {
                var point2 = {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                    "type": "Point",
                    "coordinates": [proj.properties.long, proj.properties.lat]
                  }
                };            
                projectsById[points[i].ref].properties.distance = turf.distance(point, point2);
            }
        }
    }
    
    function compareDistance(a,b) {
        if (projectsById[a.ref].properties.distance < projectsById[b.ref].properties.distance) return -1;
        if (projectsById[a.ref].properties.distance > projectsById[b.ref].properties.distance) return 1;
        return 0;
    }
    
    return {
	   printDistance: function(lat, lon) {
			return printDistance(lat, lon);
       },
       loadData: function(url, callback) {
			return loadData(url, callback);
       },
       search: function(val) {
			return idx.search(val);
       },
       getProject: function(id) {
            return projectsById[id];
       },
       filterByAmbit: function(value, points) {
            return filterByFV("ambit_biologic", value, points);
       },
       filterByActiu: function(value, points) {
            return filterByFV("actiu", value, points);
       },
       orderByPosition: function(coords, points) {
            return orderByPosition(coords, points);
       }
    }

});