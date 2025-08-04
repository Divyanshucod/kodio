import express from 'express'
import { WebSocketServer } from 'ws';
import cors from 'cors'
import { eventSetup } from './sockets';
import { routesSetup } from './routes';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json())
app.use(cors())
app.use(cookieParser())
const server = app.listen(3000,()=>{
    console.log('express and websocket server are running at port 3000');
})
const wss = new WebSocketServer({server})
routesSetup(app)
eventSetup(wss);
