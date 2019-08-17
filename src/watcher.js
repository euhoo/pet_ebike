var socket = io();

socket.on('change', (data) => {
    // console.log(data);
    location.reload();  
});