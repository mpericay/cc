/**
 * @author Martí Pericay <marti@pericay.com>
 */

define(['search', 'leaflet', 'bootstrap', 'select', 'cookies'], function(search, L) {
    "use strict";

    var map;

    var makeSearch = function(value, options) {
        value = value ? value + "^10 " + value + "*" : "";//search exact word or word starting with
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

    var onLoadFinished = function() {
        makeSearch();

        //open project modal if suitable url
        var doc = search.getProject(page);
        if(doc) openProject(doc);
    }

    //manage complementary filters
    var refineSearch = function(list, options) {
        if (options.ambit) {
            list = search.filterByAmbit(options.ambit, list);
        }
        if (options.actiu) {
            list = search.filterByActiu(options.actiu, list);
        }
        if (options.position) {
            list = search.orderByPosition(options.position, list);
        }

        return list;
    };

	// build list of results
    var buildSearchResult = function (doc) {
        var li = document.createElement('li'),
            img = document.createElement('img'),
            h2 = document.createElement('h2'),
            p = document.createElement('p'),
            dist = document.createElement('p')

        li.className = "col-lg-4 col-sm-6 col-xs-12 project-wrap"
        h2.textContent = doc.properties.nom_del_projecte;
        h2.className = "searchTitle";
        var foto = doc.properties.arxiu_foto ? "fotos/" + doc.properties.arxiu_foto + ".jpeg" : 'img/empty.jpg';
        img.setAttribute("src",  foto );
        img.className = "searchPic";
        p.textContent = doc.properties.ambit_geografic_text;
        p.className = "searchSubtitle";

        li.appendChild(h2);
        li.appendChild(img);
        li.appendChild(p);

        handleImageError();

        //distance: must we show the kms or a text?
        var getDistanceText = function(kms) {
            if (kms <= 25) {
                return "A 25 kms o menys";
            } else if (kms < 50) {
                return "Entre 25 i 50 kms";
            } else if (kms < 100) {
                return "Entre 50 i 100 kms";
            } else {
                return "A 100 kms o més";
            }
        }
        //if we're filtering by distance, show the distance
        if ($("#loc").val()) {
            dist.textContent = getDistanceText(doc.properties.distance.toFixed(0));
            dist.className = "searchKms";
            li.appendChild(dist);
        }

        //open project modal
        $(li).click(function () {
            window.history.pushState(null, 'Project', doc.properties.url_projecte);
            openProject(doc);
            return false;
        });

	  return li
	};

    var openProject = function(doc) {
        $('#textModal .modal-header').html(doc.properties.nom_del_projecte);
        $('#textModal .modal-body').html(buildSheetHtml(doc.properties));
        handleImageError();
        $("#textModal").modal();
    }

    var handleImageError = function() {
        $('img').error(function(){
            $(this).attr('src', 'img/empty.jpg');
        });
    }

    var buildSheetHtml = function (props) {
        var parent = document.createElement('div'),
            img = document.createElement('img'),
            subTitle = document.createElement('div'),
            subPlace = document.createElement('div'),
            subAssociation = document.createElement('div'),
            activeProject = document.createElement('div'),
            txtWrap = document.createElement('div')

        // write subtitle bar image
        img.setAttribute("src", "fotos/" + props.arxiu_foto + ".jpeg");
        img.className = "sheetPic";
        txtWrap.className = "txtWrap";
        subTitle.className = "subTitle";

        //elements that are not in the right side
        parent.appendChild(subTitle);
        parent.appendChild(img);
        parent.appendChild(txtWrap);
        subPlace.textContent = props.ambit_geografic_text;
        subPlace.className = "subPlace";
        subAssociation.textContent = props.entitat;
        subAssociation.className = "subAssociation";
        activeProject.textContent = props.actiu;
        if(props.actiu) activeProject.className = "activeProject " + props.actiu.toLowerCase();
        subTitle.appendChild(subPlace);
        subTitle.appendChild(subAssociation);
        parent.appendChild(activeProject);

        // write all items of sheet
        txtWrap.appendChild(buildSheetItem("Ambit biològic", props.ambit_biologic));
        txtWrap.appendChild(buildSheetItem("Descripció del projecte", props.descripcio_resumida));
        txtWrap.appendChild(buildSheetItem("Activitat prevista", props.activitat_prevista));
        txtWrap.appendChild(buildSheetItem("Com participar en el projecte", props.com_participar_en_el_projecte));
        if(props.nom_del_projecte) buildSocial(txtWrap, props.nom_del_projecte);

        // more info button
        if(props.web_del_projecte && props.web_del_projecte.trim() != '') buildLink(txtWrap, props.web_del_projecte);

        return parent;
    };

    //Project web is not a regular link, but a button
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
        $(div).append('<a href="http://www.facebook.com/sharer.php?u=' + encodeURI(location) +'" target="_blank"><img src="img/icons/facebook.png" alt="Facebook" class="share-buttons" /></a>');

        //Twitter
        $(div).append('<a href="https://twitter.com/share?url=' + encodeURI(location) +'&amp;text=' + text + '&amp;hashtags=" target="_blank"><img src="img/icons/twitter.png" alt="Twitter" class="share-buttons"/></a>');

        //Linkedin
        $(div).append('<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURI(location) +'" target="_blank"><img src="img/icons/linkedin.png" alt="LinkedIn" class="share-buttons" /></a>');
    };

    //create every item of results list
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

        // don't create the map again
        if (map) return;

        var center = [41.388, 2.183];
        var zoom = 8;
        var decimals = 4; //number of decimals to show lon/lat
        map = L.map(div).setView(center, zoom);

        var Hydda_Full = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        var marker = L.marker(new L.LatLng(center[0], center[1]), {
            draggable: true
        }).addTo(map);
        //reflect marker dragging into x and y boxes
        marker.on('dragend', function (e) {
            showLatLng(e.target.getLatLng());
        });
        var showLatLng = function(latlng) {
            $('#xId').val(latlng.lng.toFixed(decimals));
            $('#yId').val(latlng.lat.toFixed(decimals));
        };
        //show first lat/lng
        showLatLng(new L.LatLng(center[0], center[1]));

        //submit
        var setMapValue = function(value) {
            $("#loc").val(value);
            $("#mapModal").modal('hide');
        }
        //select button
        $('#mapOKBtn').on('click', function () {
            setMapValue($('#xId').val() + " " + $('#yId').val());
        });
        // clear button
        $('#mapClearBtn').on('click', function () {
            setMapValue("");
        });
    };

    var getPage = function() {
        var url = new URL(window.location.href);
        var arr = url.pathname.split("/");
        return arr.slice(-1)[0];
    };

    //we search only on home page
    var page = getPage();
    if (page != "recursos" && page != "contacte") {

        //make default search on load (no params)
        search.loadData("data/cc_projects.geojson", onLoadFinished);

        //make search on click
        $("#searchBtn").on("click", function() {
               submitSearch();
        });

        //make search on click
        $("#clearBtn").on("click", function() {
            $('#proj').val("");
            $('#loc').val("");
            $('select[id=bio]').val("");
            $('select[id=oberttancat]').val("");
            $('.selectpicker').selectpicker('refresh');
            submitSearch();
        });

        //make search on enter press
        $(document).keypress(function(e) {
            if(e.which == 13) {
               submitSearch();
            }
        });

        var submitSearch = function() {
            var options = {
                    ambit: $("#bio").val(),
                    actiu: $("#oberttancat").val()
                };
                var pos = $("#loc").val().split(" ");
                if (pos[0] && pos[1]) {
                    options.position = {
                        lat: pos[1],
                        lon: pos[0]
                    };
                }
                makeSearch($("#proj").val(), options);
        }

        // undo URL navigation when hiding modal
        $('#textModal').on('hidden.bs.modal', function () {
            window.history.pushState(null, 'Home', '.');
        });

        // map modal
        $('#loc').on('click', function () {
            openMap('map');
        });

        $(".combo").selectpicker();

    }


});
