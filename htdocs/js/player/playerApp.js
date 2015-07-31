var playerApp = (function() {

    var me = this,
        currentScreen,
        playerObject,
        config = {
            gameLength: 10,
            dataTickLength: 3,
            animationTickLength: 1,
            maxIntensity: 16
        },
        gameState = createGameState(),
        playerChannel,
        timers = {
            'animationTimer': null,
            'dataTimer': null
        },
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
            intensity: 0
        }

    }

    function startGame() {

        console.log('start game');  

        //start timers
        timers.dataTimer = window.setInterval(dataTick, (config.dataTickLength * 1000));
        timers.animationTimer = window.setInterval(animationTick, (config.animationTickLength * 1000));

        ui.goToScreen('play');

    }

    function stopGame() {

        clearInterval(timers.dataTimer);
        clearInterval(timers.animationTimer);

        console.log('game ended');
        ui.goToScreen('score');

    }

    function animationTick() {

        debugLog('animationTick');
        ui.setIntensity();
        gameState.intensity = 0;

    }

    function dataTick() {

        for (var i=0; i<100; i++) {
            playerChannel.set('score', gameState.player.score);
        }

        debugLog('dataTick');

    }

    function handleTeamChoice(team) {

        console.log('handle team choice');

        gameState.player.team = team;

        playerChannel.set('team', team);

        ui.goToScreen('about-to-start');

    }

    function handleTap() {
       gameState.player.score++;
       gameState.intensity++;
    }

    function debugLog(msg) {
        var date = new Date();

        $('#debug').val($('#debug').val() + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' - ' + msg + '\n');
        $('#debug').scrollTop($('#debug')[0].scrollHeight);

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
