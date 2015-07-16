var playerApp = (function() {

    var me = this,
        currentScreen,
        playerObject,
        config = {
            gameLength: 5
        },
        dummyPlayer = {
            id: 1,
            name: 'danny',
            image: 'leeg',
            taps: 0
        },
        timeRemaining = 0,
        gameTickTimer,
        gameTickLength = 3000,
        taps = 0,
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


        //temp
        //startGame();

        ui.goToScreen('choose-side');


       
    }

    function startGame() {

        console.log('start game');  

        //start timer
        gameTickTimer = window.setInterval(gameTick, gameTickLength);
        timeRemaining = config.gameLength;

        ui.goToScreen('play');


    }

    function endGame() {

        clearInterval(gameTickTimer);
        console.log('game ended');
        ui.goToScreen('end');

    }


    function gameTick() {

        console.log('gametick', timeRemaining);
        console.log('send: ' + taps);

        taps = 0;
        timeRemaining--;

        if(timeRemaining < 0) {
            endGame();
        }

    }


    function handleTeamChoice(team) {

        console.log('handle team choice');

        socket.emit('message', {
                type: 'handle_team_choice',
                player: dummyPlayer,
                team: team
            }
        );

        ui.goToScreen('about-to-start');

    }


    function handleTap() {
        taps++;
    }

    return {
        init: init,
        handleTap,
        handleTeamChoice,
        startGame
    }

})();
