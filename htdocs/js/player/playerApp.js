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
        messaging.init();

        //player events
        // socket.on('...', startGame);
        // socket.on('...', endGame);

        ui.goToScreen('choose-side');

        device.on('player', function(player){

            playerChannel = player;

            //bind event to values or messages
            playerChannel.on('name', function(name){
              //$('#name').text(name);
              //console.log('playerchannel on', name);
              alert('name: ' + name);

              //todo: set name to player object
            });

            playerChannel.on('iets', function(data) {
                //alert('iets', data );
                console.log(data);
            });

            player.on('photo', function(url){
                //$('#photo').attr('src', url);
                alert('photo: ' + url);

                //todo: set photo to player object
            });

            player.on('iets', function(data){
                //alert(data);
            })

            player.on('isrunning', function()) {



            }

            // player.set('test', 2392039203920930293); //set some test data
            // player.send('testMsg', 'hello world'); //send some test data

        });

        //test
        playerChannel.on('state', function() {

            //

        });

     
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


        //todo: set player choice
        //playerChannel.set





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
