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

socket.on('newLocationMessage', function(message) {
    console.log('newLocationMessage', message);
    const li = $('<li></li>');
    const a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
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
    const messageText = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageText.val()
    }, function(data) {
        messageText.val('');
    });
});

const locationButton = $("#send-location");

locationButton.on('click', function(event) {
    if (!navigator.geolocation) {
        return alert('Your browser does not support geolocation.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});