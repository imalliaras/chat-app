const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'mike@example.com',
        text: 'Hey',
        createdAt: 123
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMEssage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('User was disconected');
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});