"use strict";
var request = require('request');

function init() {
	
	Homey.log("Init done");
	
}

module.exports.init = init;


Homey.manager('flow').on('action.traveltime', function( callback, args ){
	
	request('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Amsterdam&destinations=Almere&mode=driving&language=en', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			
			var data = JSON.parse(body);
	    	
	    	var output = data.rows[0].elements[0].duration.text;
	    	Homey.log('Say: ' + output);
	    	Homey.manager('speech-output').say( output );
	    	
	  	} else {
		  	
		  	if(error) Homey.log('error: ' + error);
		
		}
		
	});
	callback( null, true ); 
});