// server.js
const express = require('express');
const SocketServer = require('ws');
const uuid = require('node-uuid');


// Set the port to 4000
const PORT = process.env.PORT || 4000

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

const messages = []

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
  	console.log("beginning message", message)

  	let parsedMsg = JSON.parse(message)
  	console.log("Message type!", parsedMsg, parsedMsg.type)

  	if (parsedMsg.type === "postNotification") {
  		parsedMsg.type = "incomingNotification";
  		parsedMsg.username = parsedMsg.username;
  		parsedMsg.content = parsedMsg.content;
	  } else if (parsedMsg.type === "postMessage") {
	  	parsedMsg.type = "incomingMessage";
	  	parsedMsg.uuid = uuid.v4();
	  	parsedMsg.username = parsedMsg.username;
	  	parsedMsg.content = parsedMsg.content;
	  } else {
	  	console.log("Error!")
	  }
	  console.log("message at end", parsedMsg)
	  wss.broadcast(JSON.stringify(parsedMsg))
  	// wss.broadcast(JSON.stringify(nameChangeToClient));
  })

	// ws.on('message', (message) => {
	// 	console.log("message triggered", message)
	// 	let parsedMsg = JSON.parse(message)
	// 	let messageToClient = {
	// 		type: "incomingMessage",
	// 		uuid: uuid.v4(),
	// 		username: parsedMsg.username,
	// 		content: parsedMsg.content
	// 	}
	// 	wss.broadcast(JSON.stringify(message));
	// })	

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});