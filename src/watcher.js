var socket = io();
socket.on('change', () => {
    location.reload(); 
});