var require = (function() {
	var scripts = document.getElementsByTagName('script');
	var HERE = scripts[scripts.length-1].src.replace(/[^\/]*$/, '');
	var LIB_PATH = HERE + "lib/";
	return {
		baseUrl: HERE + "modules/",
		paths: {
			"bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min",
            "css": "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css.min",
            "turf": "https://cdnjs.cloudflare.com/ajax/libs/Turf.js/5.1.5/turf.min",
            "jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min",
			"lunr": "https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.2/lunr.min"
		},
		shim: {
			"bootstrap": {
				deps: ["jquery", "css!https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"]
			},
			"typeahead": {
				deps: ["bootstrap"]
			}
            
		}
	};
})();

