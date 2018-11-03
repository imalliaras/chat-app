const socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disonnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMEssage', message);
    const li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#chat').append(li);
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'hi'
}, function(data) {
    console.log('Got it', data);
});

$('#chat-form').on('submit', function(event) {
    event.preventDefault();
    console.log(event);
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function(data) {
        // console.log('Got it', data);
    });
});