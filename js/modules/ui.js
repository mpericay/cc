/**
 * @author Martí Pericay <marti@pericay.com>
 */

define(['search', 'bootstrap'], function(search) {
    "use strict";
    
    var makeSearch = function(value) {
        value = value ? value : "";
        var results = search.search(value);
          $("#resultsList").empty();
          //if results
          if (!results.length) {
            $("#noResults").html("No s'han trobat resultats");
          } else {
            $("#noResults").html("Mostrant <b>" + results.length + "</b> resultats");
            for(var i=0; i < results.length; i++) {
              var proj = search.getProject(results[i].ref);
              $("#resultsList").append(buildSearchResult(proj));
            };
          }        
    };
    
	var buildSearchResult = function (doc) {
        var li = document.createElement('li'),
            img = document.createElement('img'),
            h2 = document.createElement('h2'),
            p = document.createElement('p')
        
        li.className = "col-lg-4 col-sm-6 col-xs-12 project-wrap"
        h2.textContent = doc.properties.nom_del_projecte;
        h2.className = "searchTitle";
        img.setAttribute("src", "img/projects/example.jpg");
        img.className = "searchPic";
        p.textContent = doc.properties.ambit_geografic;
        p.className = "searchSubtitle";
  
        li.appendChild(h2);
        li.appendChild(img);
        li.appendChild(p);
        
        $(li).click(function () {
            //window.location.hash = 'xyz';
            window.history.pushState(null, 'Project', doc.properties.nom_del_projecte);
            $('#textModal .modal-header').html(doc.properties.nom_del_projecte);
            $('#textModal .modal-body').html(buildSheetHtml(doc.properties));
            $("#textModal").modal();
            return false;
        });

	  return li
	};
    
    var buildSheetHtml = function (props) {
        var parent = document.createElement('p'),
            img = document.createElement('img')
        
        img.setAttribute("src", "img/projects/example.jpg");
        img.className = "sheetPic";
        
        parent.appendChild(img);
        parent.appendChild(buildSheetItem("Ambit biològic", props.ambit_biologic));
        parent.appendChild(buildSheetItem("Ambit geogràfic", props.ambit_geografic));
        parent.appendChild(buildSheetItem("", props.entitat, "house"));        
        parent.appendChild(buildSheetItem("Descripció del projecte", props.activitat_prevista));
        parent.appendChild(buildSheetItem("Activitat prevista", props.activitat_prevista));
        parent.appendChild(buildSheetItem("Com participar en el projecte", props.com_participar_en_el_projecte));
        
        return parent;
    };
    
    var buildSheetItem = function(header, text, className) {
        var parent =  document.createElement('p'),
            itemHeader = document.createElement('h4'),
            itemText = document.createElement('p')
        itemHeader.textContent = header;
        itemText.textContent = text;
        if (className) itemText.className = className;
        
        parent.appendChild(itemHeader);
        parent.appendChild(itemText);
        return parent;
    }
    
    search.loadData("data/projects.geojson", makeSearch);
    
    $("#searchBtn").on("click", function() {
            makeSearch($("#proj").val());
    });
    
    // undo URL navigation when hiding modal
    $('#textModal').on('hidden.bs.modal', function () {
        window.history.pushState(null, 'Home', '.');
    });
    

});