var playerApp = (function() {

    var me = this,
        currentScreen,
        playerObject,
        config = {
            gameLength: 10,
            dataTickLength: 3,
            animationTickLength: 1,
            maxIntensity: 10
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

            player.on('rejected', function(rejected){
                if(rejected == 1) {
                    ui.goToScreen('rejected')
                }
            });

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

        //initial screen
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

        dataTick();

        console.log('game ended');
        ui.goToScreen('score');

    }

    function animationTick() {
        ui.setIntensity();
        gameState.intensity = 0;
    }

    function dataTick() {

        playerChannel.set('score', gameState.player.score);
        debugLog('dataTick');
    }

    function handleTeamChoice(team) {

        console.log('handle team choice');

        gameState.player.team = team;
        playerChannel.set('team', team);

        ui.goToScreen('about-to-start');

    }

    function handleTap(e) {

       e.stopPropagation(); 
       e.preventDefault();

       gameState.player.score++;
       gameState.intensity++;

    }

    function debugLog(msg) {
        var date = new Date();

        if($('#debug').size() < 1) return false;
        $('#debug').val($('#debug').val() + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' - ' + msg + '\n');
        $('#debug').scrollTop($('#debug')[0].scrollHeight);

    }

    return {
        init: init,
        gameState: gameState,
        handleTap: handleTap,
        handleTeamChoice: handleTeamChoice,
        startGame: startGame,
        config: config,
        debugLog: debugLog
    }

})();
