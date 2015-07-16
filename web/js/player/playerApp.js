var playerApp = (function() {

    var me = this,
        currentScreen,
        playerObject,
        
        dummyPlayer = {
            id: 1,
            name: 'danny',
            image: 'leeg'
        },
        socket;

    function init () {

        console.log('init player app, start init other modules');

        ui.init();

        var docLoc = document.location,
            port   = docLoc.port,
            socketUrl = '//' + docLoc.hostname;

        if (port !== '') {
            socketUrl += ':' + port;
        }

        socketUrl += '/players';

        socket = io(socketUrl);

        // socket.on('message', function (data) {
        //     var messages = document.getElementById('messages'),
        //         html = messages.innerHTML;

        //     html += data.message + '<br/>';

        //     messages.innerHTML = html;
        // });


        handleTeamChoice('left');
       
    }



    function handleTeamChoice(team) {

        console.log('handle team choice');

        socket.emit('message', {
            type: 'handle_team_choice',
            player: dummyPlayer,
            team: team
        }
        );


    }


    function handleTap() {
        console.log('button tapped');

        //player.set



    }



    return {
        init: init,
        test: 'hoi'
    }

})();
