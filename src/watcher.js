var socket = io();
        socket.on('change', () => {
            location.reload(); 
        })
//для отдельного модуля раскомментировать здесь