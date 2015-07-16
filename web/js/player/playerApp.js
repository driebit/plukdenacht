var playerApp = (function() {

    var me = this,
        currentScreen,
        playerObject,
        config = {
            gameLength: 4,
            gameTickLength: 2000
        },
        gameState = createGameState(),
        socket;

    function init () {

        console.log('init player app, start init other modules');

        ui.init();
        messaging.init();

        //player events
        // socket.on('...', startGame);
        // socket.on('...', endGame);

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

        // socket.emit('message', {
        //         type: 'handle_team_choice',
        //         player: gameState.player,
        //         team: team
        //     }
        // );

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
