/**
 * @author Martí Pericay <marti@pericay.com>
 */

define(['search', 'leaflet', 'bootstrap'], function(search, L) {
    "use strict"; 
    
    var makeSearch = function(value, options) {
        value = value ? value : "";
        var results = search.search(value);
          $("#resultsList").empty();
          //if results
          if (!results.length) {
            $("#noResults").html("No s'han trobat resultats");
          } else {
            if(options) results = refineSearch(results, options);
            $("#noResults").html("Mostrant <b>" + results.length + "</b> resultats");
            for(var i=0; i < results.length; i++) {
              var proj = search.getProject(results[i].ref);
              $("#resultsList").append(buildSearchResult(proj));
            };
          }        
    };
    
    var refineSearch = function(list, options) {
        if (options.ambit) {
            list = search.filterByTipus(options.ambit, list);
        }
        if (options.position) {
            list = search.orderByPosition(options.position, list);
        }
        
        return list;
    };
    
	var buildSearchResult = function (doc) {
        var li = document.createElement('li'),
            img = document.createElement('img'),
            h2 = document.createElement('h2'),
            p = document.createElement('p'),
            dist = document.createElement('p')
        
        li.className = "col-lg-4 col-sm-6 col-xs-12 project-wrap"
        h2.textContent = doc.properties.nom_del_projecte;
        h2.className = "searchTitle";
        img.setAttribute("src", "http://cc.bioexplora.cat/fotos/" + doc.properties.arxiu_foto + ".jpeg");
        img.className = "searchPic";
        p.textContent = doc.properties.ambit_geografic;
        p.className = "searchSubtitle";
  
        li.appendChild(h2);
        li.appendChild(img);
        li.appendChild(p);
        if (doc.properties.distance) {
            dist.textContent = doc.properties.distance.toFixed(0) + " kms";
            dist.className = "searchKms";
            li.appendChild(dist);
        }
        
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
            subTitle = document.createElement('div'),
            subPlace = document.createElement('div'),
            subAssociation = document.createElement('div'),
            activeProject = document.createElement('div'),
            txtWrap = document.createElement('div')
        
        // write subtitle bar image
        img.setAttribute("src", "http://cc.bioexplora.cat/fotos/" + props.arxiu_foto + ".jpeg");
        img.className = "sheetPic";
        txtWrap.className = "txtWrap";
        subTitle.className = "subTitle";
        
        //elements that are not in the right side
        parent.appendChild(subTitle);
        parent.appendChild(img);
        parent.appendChild(txtWrap);
        subPlace.textContent = props.ambit_geografic;
        subPlace.className = "subPlace";
        subAssociation.textContent = props.entitat;
        subAssociation.className = "subAssociation";
        activeProject.textContent = "Obert"; //will be props.actiu
        activeProject.className = "activeProject obert";
        subTitle.appendChild(subPlace);
        subTitle.appendChild(subAssociation);
        parent.appendChild(activeProject);
        
        // write all items of sheet
        txtWrap.appendChild(buildSheetItem("Ambit biològic", props.ambit_biologic));
        txtWrap.appendChild(buildSheetItem("Descripció del projecte", props.activitat_prevista));
        txtWrap.appendChild(buildSheetItem("Activitat prevista", props.activitat_prevista));
        txtWrap.appendChild(buildSheetItem("Com participar en el projecte", props.com_participar_en_el_projecte));        
        buildSocial(txtWrap, props.nom_del_projecte);
        
        // more info button
        if(props.web_del_projecte.trim() != '') buildLink(txtWrap, props.web_del_projecte);
        
        return parent;
    };
    
    var buildLink = function(div, text) {
        var infoLink = document.createElement('a'),
            infoButton = document.createElement('button');
            
        infoLink.href = text;
        infoButton.textContent = "Web del projecte";
        infoButton.className = "infoButton";
        infoButton.type = "button";
        infoLink.appendChild(infoButton);
        div.appendChild(infoLink);
    };
    
    var buildSocial = function(div, text) {
        $(div).append("<h4>Comparteix-ho</h4>");
        //Facebook (old?)
        $(div).append('<a href="http://www.facebook.com/sharer.php?u=' + encodeURI(location) +'" target="_blank"><img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" class="share-buttons" /></a>');
        
        //Twitter
        $(div).append('<a href="https://twitter.com/share?url=' + encodeURI(location) +'&amp;text=' + text + '&amp;hashtags=" target="_blank"><img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" class="share-buttons"/></a>');
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
    };
    
    var openMap = function(div) {    
        $("#mapModal").modal();
        
        var center = [41.3, 2.1];
        var zoom = 8;
        var decimals = 5; //number of decimals to show lon/lat
        var map = L.map(div).setView(center, zoom);
        
        var Hydda_Full = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
            attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker(new L.LatLng(41.425, 2.221), {
            draggable: true
        }).addTo(map);
        //reflect marker dragging into x and y boxes
        /*var xBox = $('#xId');
        var yBox = $('#yId');
        marker.on('dragend', function (e) {
            var latlng = e.target.getLatLng();
            xBox.val(latlng.lng.toFixed(decimals));
            yBox.val(latlng.lat.toFixed(decimals));
        });*/        
    };
    
    search.loadData("data/projects.geojson", makeSearch);
    
    $("#searchBtn").on("click", function() {
            var options = {
                ambit: $("#bio").val(),
                position: {
                    lat: 41.118159,
                    lon: 1.236649 // tarragona
                }
            };
            makeSearch($("#proj").val(), options);
    });
    
    // undo URL navigation when hiding modal
    $('#textModal').on('hidden.bs.modal', function () {
        window.history.pushState(null, 'Home', '.');
    });
    
    // map modal
    $('#loc').on('click', function () {
        openMap('map');
    });
    

});