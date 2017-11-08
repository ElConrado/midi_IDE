var ws ;
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8080});
	
	/*
	Read Configs 
	*/
var ConfigReader = require('./settings.js');
try {
	var Hardconfig = new ConfigReader.hardKeys();
	var Softconfig = new ConfigReader.giveSettings();
}
catch(e){
	console.log(e);
	process.exit(1);
}
try {
  var midi = require('midi');

	// Set up a new input.
	var input = new midi.input();

	// Count the available input ports.
	input.getPortCount();

	// Get the name of a specified input port.
	input.getPortName(0);

	
			input.openPort(0);
// Open the first available input port.

	// Sysex, timing, and active sensing messages are ignored
	// by default. To enable these message types, pass false for
	// the appropriate type in the function below.
	// Order: (Sysex, Timing, Active Sensing)
	// For example if you want to receive only MIDI Clock beats
	// you should use
	// input.ignoreTypes(true, false, true)
	input.ignoreTypes(false, false, false);

	// ... receive MIDI messages ...

	// Close the port when done.
	//input.closePort();
}
catch (e) {
  console.log("noMidiFound");
}
finally {
  console.log("Run WebSocketServer");
}

/*
Initial ws WebSocketServer 
*/
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {

    if (client.readyState==1) {
      client.send(data);
    }
  });
};
		
wss.on('connection', function(ws) {
	
	input.on('message', function(deltaTime, message) {
		// The message is an array of numbers corresponding to the MIDI bytes:
		//   [status, data1, data2]
		// https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
		// information interpreting the messages.

		wss.broadcast(JSON.stringify({'m':  message,'d': deltaTime} ));
		
	});

// Configure a callback.

	console.log('EOF');
	
	 ws.on('close', function() {
        console.log('received:');
    });
	
    ws.on('message', function(message) {
        console.log('received: %s', message);
    });
	var date = new Date();
var current_hour = date.getHours();
    ws.send(JSON.stringify({'m':'STARTED','d':date}));
   setTimeout(function(){ ws.send(JSON.stringify({'command':'hardkeyset','d':Hardconfig}));}, 3000);
   setTimeout(function(){ ws.send(JSON.stringify({'command':'softkeyset','d':Softconfig}));}, 3000);
});

