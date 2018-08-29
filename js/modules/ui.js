/**
 * @author Martí Pericay <marti@pericay.com>
 */

define(['search', 'bootstrap', 'typeahead'], function(search) {
    "use strict";
    	
    var idx;
    
    search.loadData("data/projects.geojson");
    
    $("#searchBtn").on("click", function() {
          var results = search.search($("#proj").val());
          $("#resultsList").empty();
          //if results
          for(var i=0; i < results.length; i++) {
            var proj = search.getProject(results[i].ref);
            $("#resultsList").append(buildSearchResult(proj));
          };
        });
      
	var buildSearchResult = function (doc) {
	  var li = document.createElement('li'),
	      h2 = document.createElement('h2'),
	      p = document.createElement('p')

	  h2.dataset.field = 'name'
	  h2.textContent = doc.properties.nom_del_projecte

	  p.dataset.field = 'body'
	  p.textContent = doc.properties.web_del_projecte

	  li.appendChild(h2)
	  li.appendChild(p)

	  return li
	}    
    

});