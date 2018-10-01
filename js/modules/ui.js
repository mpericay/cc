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
        var parent = document.createElement('div'),
            img = document.createElement('img'),
            txtWrap = document.createElement('div')
        
        img.setAttribute("src", "img/projects/example.jpg");
        img.className = "sheetPic";
        txtWrap.className = "txtWrap";
        
        parent.appendChild(img);
        parent.appendChild(txtWrap);
        txtWrap.appendChild(buildSheetItem("Ambit biològic", props.ambit_biologic));
        txtWrap.appendChild(buildSheetItem("Ambit geogràfic", props.ambit_geografic));
        txtWrap.appendChild(buildSheetItem("", props.entitat, "house"));        
        txtWrap.appendChild(buildSheetItem("Descripció del projecte", props.activitat_prevista));
        txtWrap.appendChild(buildSheetItem("Activitat prevista", props.activitat_prevista));
        txtWrap.appendChild(buildSheetItem("Com participar en el projecte", props.com_participar_en_el_projecte));        
        buildSocial(parent, props.nom_del_projecte);
        return parent;
    };
    
    var buildSocial = function(div, text) {
        $(div).append("<h4>Comparteix-ho</h4>");
        //Facebook (old?)
        //$(div).append('<a href="http://www.facebook.com/sharer.php?u=' + location +'" target="_blank"><img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" /></a>');
        
        //Twitter
        $(div).append('<a href="https://twitter.com/share?url=' + location +'&amp;text=' + text + '&amp;hashtags=" target="_blank"><img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" class="share-buttons"/></a>');
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