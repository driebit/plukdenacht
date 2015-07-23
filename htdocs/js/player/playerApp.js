var playerApp = (function() {

    var me = this,
        currentScreen,
        playerObject,
        config = {
            gameLength: 10,
            gameTickLength: 2,
            maxIntensity: 26
        },
        gameState = createGameState(),
        playerChannel,
        socket;

    function init () {

        console.log('init player app, start init other modules');

        ui.init();
        
        device.on('player', function(player) {

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
                score: 0,
                isrunning: 0
            },
            gameTickTimer: null,
            intensity: 0
        }

    }

    function startGame() {

        console.log('start game');  

        //start timer
        gameState.gameTickTimer = window.setInterval(gameTick, (config.gameTickLength * 1000));

        ui.goToScreen('play');

    }

    function stopGame() {

        clearInterval(gameState.gameTickTimer);

        console.log('game ended');
        ui.goToScreen('score');

    }

    function gameTick() {

        playerChannel.set('score', gameState.player.score);

        ui.setIntensity();
        gameState.intensity = 0;

    }

    function handleTeamChoice(team) {

        console.log('handle team choice');

        gameState.player.team = team;

        // for (var i = 0; i<22; i++) {
        //     playerChannel.set('team', team);

        // };

        playerChannel.set('team', team);

        ui.goToScreen('about-to-start');

    }

    function handleTap() {
       gameState.player.score++;
       gameState.intensity++;
    }

    return {
        init: init,
        gameState: gameState,
        handleTap: handleTap,
        handleTeamChoice: handleTeamChoice,
        startGame: startGame,
        config: config
    }

})();
