SERVER_PORT = 3010 ;
var request = require("request"); // 
var app = require('express')(); // express web framework for node js
var http = require('http').Server(app);



var fs = require('fs');
var raw_json = JSON.parse(fs.readFileSync('community_radio_raw.json', 'utf8'));

app.set('json spaces',5);
app.get('/radio',function( req,res ){

	var state_wise_count = {};
	var total_count = 0;
	var pi_chart_data = []
	//console.log(raw_json['fields']);
	data = raw_json['data'];
	for ( var i in data){
		 radio_station = data[i];
		 state_name = radio_station[3];

		 state_name = state_name.trim();
		 if ( state_name in state_wise_count ){
		 	state_wise_count[state_name] = state_wise_count[state_name] + 1;
		 }
		 else{
		 	state_wise_count[state_name] = 1;
		 }
		 total_count = total_count+1;
 	}

 	// generate percentages for the pi chart
 	for ( var i in state_wise_count ){
 		c = state_wise_count[i];
 		console.log( i + " " + c  + " out of "+total_count);
 		var s = [];
 		s.push( i , (c/total_count)*100);
 		pi_chart_data.push(s);

 	}
	
	res.jsonp(pi_chart_data);
});

http.listen(SERVER_PORT, function(){
  console.log('listening on *: ' + SERVER_PORT);
});





