/**
 * @author Martí Pericay <marti@pericay.com>
 */

define([ 'cookieconsent'], function() {
    "use strict";
    
 	window.addEventListener("load", function(){
	window.cookieconsent.initialise({
	  "palette": {
		"popup": {
		  "background": "#f5f5f5",
		  "text": "#5c7291"
		},
		"button": {
		  "background": "#333",
		  "text": "#ffffff"
		}
	  },
	  "content": {
		"message": "Aquest lloc web utilitza cookies per millorar i personalitzar la teva experiència oferint-te continguts que t'interessen. Si segueixes navegant, considerem que acceptes la seva instal·lació i ús. Pots canviar la configuració o obtenir-ne més informació a",
		"dismiss": "OK",
		"link": "Política de cookies",
		"href": "http://museuciencies.cat/wp-content/uploads/Pol%C3%ADtica-cookies_cat.pdf"
	  }
	})});

});