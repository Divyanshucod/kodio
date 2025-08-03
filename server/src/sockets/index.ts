import WebSocket from "ws";


export const eventSetup = (wss:WebSocket.Server)=>{
wss.on('connection', function connection(ws) {
  console.log('connected to websocket server',ws);
  
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('hi from server');
});
}