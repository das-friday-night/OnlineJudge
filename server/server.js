var express = require("express");
var app = express();
var restRouter = require('./router/restRouter');
var indexRouter = require('./router/indexRouter');
var path = require("path");

var mongoose = require("mongoose");
mongoose.connect("mongodb://user:user@ds125060.mlab.com:25060/onlinejudge");

app.use('/', indexRouter);

app.use(express.static(path.join(__dirname, "../public")));

app.use('/api/v1', restRouter);

app.use(function(req, res){
    res.sendFile("index.html", { root: path.join(__dirname, '../public/') });
});

// app.listen(3000, function () {
//     console.log('port 3000!')
// })

var http = require('http');
var server = http.createServer(app);
server.listen(3000);

server.on('error', onError);
server.on('listening', onListening);

function onError(error){
    throw error;
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr == 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

var socketio = require('socket.io');
var io = socketio();
io.attach(server);
var socketService = require('./services/SocketIO')(io);