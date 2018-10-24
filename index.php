<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="marti@pericay.com" />
	<meta name="author" content="hey@marccots.com" />
	<meta name="robots" content="noindex">

    <title>Ciència Ciutadana</title>

    <!-- Custom CSS -->
    <link href="css/ui.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

 </head>

<body>
	<div class="container-fluid">
		
		<?php include "header.php" ?>

		<div id="wrapper">
		<?php $url = $_SERVER['REQUEST_URI'];
			if(basename($url) == "contacte.php") include "contingut/contacte.php";
			else if(basename($url) == "recursos.php") include "contingut/recursos.php";
			else {
		?>			
			<div class="search-wrap">
				<div class="container">
					<div class="row row-search">
						<div class="col-lg-6 col-lg-offset-0 col-md-6 col-md-offset-3">
							<div class="intro-wrap">
								<div>
									<h2 class="topTitle">VOLS PARTICIPAR EN PROJECTES D’ESTUDI DE LA DIVERSITAT NATURAL?</h2>
									<p class="topSubtitle">En trobaràs a la mida de les teves aptituds, enfocats a un objectiu que t’agradi i prop de casa</p>
								</div>
							</div>
						</div>
						<div class="col-lg-6 col-lg-offset-0 col-md-8 col-md-offset-2">
				        	<form class="form-inline" role="search">
								<div class="form-group" id="searchProj"><input id="proj" class="form-input" placeholder="Projecte"></div>
							  	<div id="searchBio" class="custom-select form-group">
								  <select>
								    <option value="Ambiental">Ambiental</option>
									<option value="Aus">Aus</option>
									<option value="Coleòpters">Coleòpters</option>
									<option value="General">General</option>
									<option value="Líquens">Líquens</option>
								  </select>
								</div>
								<div class="form-group" id="searchLoc"><input id="loc" class="form-input" placeholder="Localització"></div>
								<div id="searchStatus"class="custom-select form-group">
								 <select id="oberttancat">
									<option value="Obert">Obert</option>
									<option value="Tancat">Tancat</option>
								  </select>
								</div>
								<input type="button" id="searchBtn" class="boto" value="Buscar"></input>
								<input id="clearBtn" class="boto" type="reset" value="Netejar"></input>
							</form>
						</div>

					</div>
				</div>
			</div>
			<div class="container">
				<div id="results">
					<p id="noResults"></p>
					<ol id="resultsList" class="resultsList"></ol>
				</div>
				<ul id="menuProj"></ul>
			</div>
        </div>
		<!-- /#wrapper -->

		<!-- Mapmodal -->
		<div id="mapModal" class="modal" role="dialog">
		  <div class="modal-dialog modal-lg">
		
			<!-- Modal content-->
			<div class="modal-content modal-loc">
			  <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"></button>
				<h4 class="modal-title">Cercar projecte prop de ...</h4>
			  </div>
			  <div class="modal-body">
					<div id="map"></div>
					<input id="xId"></input>
					<input id="yId"></input>
					<input type="button" id="mapOKBtn" class="loc-btn" value="Seleccionar"></input>
					<input type="button" id="mapClearBtn" class="clearBtn loc-btn" value="Eliminar"></input>
			  </div>
			  <div class="modal-footer">
				<img data-dismiss="modal" src="img/icons/close.svg">
			  </div>
			</div>
		
		  </div>	  
		</div>

		<!-- Modal -->
		<div id="textModal" class="modal" role="dialog">
		  <div class="modal-dialog modal-lg">
		
			<!-- Modal content-->
			<div class="modal-content">
			  <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"></button>
				<h4 class="modal-title"></h4>
			  </div>
			  <div class="modal-body"></div>
			  <div class="modal-footer">
				<img data-dismiss="modal" src="img/icons/close.svg">
			  </div>
			</div>
		
		  </div>
		<?php } ?>			  
		</div>
		
		
		<?php include "footer.php" ?>
 
    </div>
	<!-- /#container -->
	
	<script src="js/config.js"></script>
	<script src="js/lib/require.js" data-main="ui"></script>

	<script type="text/javascript">
		var x, i, j, selElmnt, a, b, c;
		/*look for any elements with the class "custom-select":*/
		x = document.getElementsByClassName("custom-select");
		for (i = 0; i < x.length; i++) {
		  selElmnt = x[i].getElementsByTagName("select")[0];
		  /*for each element, create a new DIV that will act as the selected item:*/
		  a = document.createElement("DIV");
		  a.setAttribute("class", "select-selected form-input");
		  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		  x[i].appendChild(a);
		  /*for each element, create a new DIV that will contain the option list:*/
		  b = document.createElement("DIV");
		  b.setAttribute("class", "select-items select-hide");
		  for (j = 0; j < selElmnt.length; j++) {
		    /*for each option in the original select element,
		    create a new DIV that will act as an option item:*/
		    c = document.createElement("DIV");
		    c.innerHTML = selElmnt.options[j].innerHTML;
		    c.addEventListener("click", function(e) {
		        /*when an item is clicked, update the original select box,
		        and the selected item:*/
		        var y, i, k, s, h;
		        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
		        h = this.parentNode.previousSibling;
		        for (i = 0; i < s.length; i++) {
		          if (s.options[i].innerHTML == this.innerHTML) {
		            s.selectedIndex = i;
		            h.innerHTML = this.innerHTML;
		            y = this.parentNode.getElementsByClassName("same-as-selected");
		            for (k = 0; k < y.length; k++) {
		              y[k].removeAttribute("class");
		            }
		            this.setAttribute("class", "same-as-selected");
		            break;
		          }
		        }
		        h.click();
		    });
		    b.appendChild(c);
		  }
		  x[i].appendChild(b);
		  a.addEventListener("click", function(e) {
		      /*when the select box is clicked, close any other select boxes,
		      and open/close the current select box:*/
		      e.stopPropagation();
		      closeAllSelect(this);
		      this.nextSibling.classList.toggle("select-hide");
		      this.classList.toggle("select-arrow-active");
		    });
		}
		function closeAllSelect(elmnt) {
		  /*a function that will close all select boxes in the document,
		  except the current select box:*/
		  var x, y, i, arrNo = [];
		  x = document.getElementsByClassName("select-items");
		  y = document.getElementsByClassName("select-selected");
		  for (i = 0; i < y.length; i++) {
		    if (elmnt == y[i]) {
		      arrNo.push(i)
		    } else {
		      y[i].classList.remove("select-arrow-active");
		    }
		  }
		  for (i = 0; i < x.length; i++) {
		    if (arrNo.indexOf(i)) {
		      x[i].classList.add("select-hide");
		    }
		  }
		}
		/*if the user clicks anywhere outside the select box,
		then close all select boxes:*/
		document.addEventListener("click", closeAllSelect);
	</script>
    
</body>

</html>
