var playerApp = (function() {

    var me = this,
        currentScreen,
        playerObject,
        config = {
            gameLength: 5,
            gameTickLength: 2000
        },
        gameState = createGameState(),
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


        //handleTeamChoice('left');

        //player events
        socket.on('...', startGame);
        socket.on('...', endGame);

        ui.goToScreen('choose-side');
      
    }

    function createGameState() {

        return {
            player: {
                id: 1,
                name: 'danny',
                image: 'leeg',
                taps: 0
            },
            timeRemaining: 0,
            gameTickTimer: null,
            taps: 0
        }

    }

    function startGame() {

        console.log('start game');  

        //start timer
        gameState.gameTickTimer = window.setInterval(gameTick, config.gameTickLength);
        gameState.timeRemaining = config.gameLength;

        ui.goToScreen('play');

    }

    function endGame() {

        clearInterval(gameState.gameTickTimer);
        console.log('game ended');
        ui.goToScreen('score');

    }

    function gameTick() {

        console.log('gametick', gameState.timeRemaining);
        console.log('send: ' + gameState.taps);

        gameState.taps = 0;
        gameState.timeRemaining--;

        if(gameState.timeRemaining < 0) {
            endGame();
        }
    }


    function handleTeamChoice(team) {

        console.log('handle team choice');

        socket.emit('message', {
                type: 'handle_team_choice',
                player: gameState.dummyPlayer,
                team: team
            }
        );

        ui.goToScreen('about-to-start');

    }

    function handleTap() {
       gameState.taps++;
       gameState.dummyPlayer.taps++;
    }

    return {
        init: init,
        handleTap,
        handleTeamChoice,
        startGame
    }

})();
