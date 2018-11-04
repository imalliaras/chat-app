const socket = io();

function scrollToBottom() {
    const messages = $('#chat');
    const newMessage = messages.children('li:last-child');
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disonnected from server');
});

socket.on('newMessage', function(message) {
    const formattedTime = moment(message.createdAt).format('H:mm a');
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#chat').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    const formattedTime = moment(message.createdAt).format('H:mm a');
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    $('#chat').append(html);
    scrollToBottom();
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