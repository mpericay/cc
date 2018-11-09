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
			if(basename($url) == "contacte") include "contingut/contacte.php";
			else if(basename($url) == "recursos") include "contingut/recursos.php";
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
								<div class="form-group" id="searchProj"><input id="proj" class="form-input" placeholder="Nom projecte"></div>
							  	<div id="searchBio" class="form-group">
								  <select class="selectpicker" id="bio">
								    <option value="" selected>Tots àmbits biològics</option>
									<option value="Ambiental">Ambiental</option>
									<option value="Aus">Aus</option>
									<option value="Fanerògames marines">Fanerògames marines</option>
									<option value="General">General</option>
									<option value="Hàbitat">Hàbitat</option>
									<option value="Libèl·lules">Libèl·lules</option>
									<option value="Líquens">Líquens</option>
									<option value="Meduses">Meduses</option>
									<option value="Mosquits">Mosquits</option>
									<option value="Orquídies">Orquídies</option>
								  </select>
								</div>
								<div class="form-group" id="searchLoc"><input id="loc" class="form-input" placeholder="Localització" readonly></div>
								<div id="searchStatus" class="form-group">
								 <select class="selectpicker" id="oberttancat">
									<option value="" selected>Actius o no</option>
									<option value="Obert">Obert</option>
									<option value="Tancat">Tancat</option>
								  </select>
								</div>
								<input type="button" id="searchBtn" class="boto" value="Buscar"></input>
								<input id="clearBtn" class="boto" type="button" value="Netejar"></input>
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
    
</body>

</html>
