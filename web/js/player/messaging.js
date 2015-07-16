var messaging = (function() {

    var socket = null;

    function init() {

        console.log('init messaging module');

        //handlers
        
         var docLoc = document.location,
            port   = docLoc.port,
            socketUrl = '//' + docLoc.hostname;

        if (port !== '') {
            socketUrl += ':' + port;
        }

        socketUrl += '/players';

        socket = io(socketUrl);

        socket.on('message', function (data) {
            var messages = document.getElementById('messages'),
                html = messages.innerHTML;

            html += data.message + '<br/>';

            messages.innerHTML = html;
        });


    }

    return {
        init: init,
        socket: socket
    }
  
})();

    