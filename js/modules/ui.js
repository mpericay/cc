/**
 * @author Martí Pericay <marti@pericay.com>
 */

define(['lunr', 'search', 'bootstrap', 'typeahead'], function(lunr, search) {
    "use strict";
    	
    var idx;
    
    search.printDistance();
    
    $.get( "data/projects.geojson", function( data ) {
            idx = lunr(function () {
                this.ref('cartodb_id')
                this.field('nom_del_projecte')
              
                data.features.forEach(function(entry){
                    this.add(entry.properties);
                }, this);
            });
        
      }, "json" );
    
    $("#searchBtn").on("click", function() {
        var results = idx.search("Cicada.cat");
          $("#results").append(results[0].ref);
        });
    

});