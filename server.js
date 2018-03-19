const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(express.static('public'));

wss.on('connection',(ws)=>{
    ws.on('message',(message)=>{
        wss.clients.forEach((client)=>{
            if(client!== ws && client.readyState===WebSocket.OPEN ){
                client.send(message);
            }
        })
    })
})
server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});