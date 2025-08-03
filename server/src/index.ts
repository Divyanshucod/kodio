import express from 'express'
import { WebSocketServer } from 'ws';
import { eventSetup } from './sockets';
import { routesSetup } from './routes';
const app = express();
const server = app.listen(3000,()=>{
    console.log('express and websocket server are running at port 3000');
})
const wss = new WebSocketServer({server})
routesSetup(app)
eventSetup(wss);
