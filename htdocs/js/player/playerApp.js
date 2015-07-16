var playerApp = (function() {

    var me = this,
        currentScreen,
        playerObject,
        config = {
            gameLength: 4,
            gameTickLength: 2000
        },
        gameState = createGameState(),
        playerChannel,
        socket;

    function init () {

        console.log('init player app, start init other modules');

        ui.init();
        
        device.on('player', function(player) {

            //async

            playerChannel = player;

            gameState.player.id = playerChannel.getID();

            playerChannel.on('name', function(name){
              gameState.player.name = name;
            });

            player.on('photo', function(url){
                gameState.player.photo = url;
            });

            player.on('isrunning', function(isrunning) {
                gameState.player.isrunning = isrunning;

                if(isrunning == 1) {
                    startGame();
                } else {
                    stopGame();
                }

            });

            // player.set('test', 2392039203920930293); //set some test data
            // player.send('testMsg', 'hello world'); //send some test data

        });

        //temp
        ui.goToScreen('choose-side');

     
    }

    function createGameState() {

        return {
            player: {
                id: 1,
                name: 'danny',
                photo: null,
                team: 'left',
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

    function stopGame() {

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
            stopGame();
        }
    }


    function handleTeamChoice(team) {

        console.log('handle team choice');

        gameState.player.team = team;
        playerChannel.set('team', team);

        ui.goToScreen('about-to-start');

    }

    function handleTap() {
       gameState.taps++;
       gameState.player.taps++;
    }

    return {
        init: init,
        gameState,
        handleTap,
        handleTeamChoice,
        startGame
    }

})();
