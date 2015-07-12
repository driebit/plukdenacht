'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    canvas,
    players;

players = io.of('/players');

players.on('connection', function (socket) {
    socket.on('message', function (data) {
        canvas.emit('message', data);
    });
});

canvas = io.of('/canvas');

canvas.on('connection', function (socket) {
    socket.on('message', function (data) {
        players.emit('message', data);
    });
});

app.use(express.static(__dirname + '/web'));

http.listen(3000);
