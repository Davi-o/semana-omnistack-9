const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose'); // npm install mongoose
const cors = require('cors');
const path = require('path');

const socket_io = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socket_io(server);

mongoose.connect('mongodb+srv://odawi:123@omnistack-guie6.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectedUsers = {};

io.on('connection', socket =>{
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next)=>{
    req.io = io;
    req.connectedUsers = connectedUsers;
    
    return next();
})
//GET, POST, PUT e DELETE
// req.query = acessar query params (filtros)
// req.params = acessar route parms (editar e deletar)
// req.body = acessar corpo da requisicao (criacao e edicao)
//app.use(cors({origin: 'http:/localhost:3337'}));       
app.use(cors({}));
app.use(express.json()); // para a aplicacao reconhecer JSON no POST
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3337);