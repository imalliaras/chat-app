const socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'jen@example.js',
        text: 'Hey this is John'
    });
});

socket.on('disconnect', function() {
    console.log('Disonnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMEssage', message);
});