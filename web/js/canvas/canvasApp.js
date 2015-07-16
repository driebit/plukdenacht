var canvasApp = (function() {

    var me = this,
        gamestate;
       

    function init () {

        console.log('init canvas app, start init other modules');

        gamestate = createGame();

        //socket

        var docLoc = document.location,
            port   = docLoc.port,
            socketUrl = '//' + docLoc.hostname;

        if (port !== '') {
            socketUrl += ':' + port;
        }

        socketUrl += '/canvas';

        socket = io(socketUrl);


        // //handlers
        socket.on('message', function (data) {

            if(data.type == 'handle_team_choice') {
                addPlayerToTeam(data.player, team);
            }

        });

    }




    function createGame() {
    
        return {
            players: []

        }
    }


    function addPlayerToTeam(player, team) {
        var player = getPlayer(id);
        player.team = team;
    }

    function addPlayer(player) {
        gamestate.players.push(player);
    }



    return {
        init: init
    }

})();
