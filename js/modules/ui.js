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
          if (!results.length) {
            $("#noResults").html("No s'han trobat resultats");
          } else {
            $("#noResults").html("Mostrant " + results.length + " resultats");
            for(var i=0; i < results.length; i++) {
              var proj = search.getProject(results[i].ref);
              $("#resultsList").append(buildSearchResult(proj));
            };
          }
        });
    
	var buildSearchResult = function (doc) {
        var li = document.createElement('li'),
            img = document.createElement('img'),
            h2 = document.createElement('h2'),
            p = document.createElement('p')
        
        h2.textContent = doc.properties.nom_del_projecte;
        h2.className = "searchTitle";
        img.setAttribute("src", "img/projects/example.jpg");
        img.className = "searchPic";
        p.textContent = doc.properties.ambit_geografic;
        p.className = "searchSubtitle";
  
        li.appendChild(h2);
        li.appendChild(img);
        li.appendChild(p);

	  return li
	}    
    

});