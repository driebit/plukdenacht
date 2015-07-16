var ui = (function() {

    function init() {

        console.log('init ui module');

        //handlers
        $('#player-left').on('click', function() {
            handleGroupSelect('left')
        });
        
        $('#player-right').on('click', function() {
            handleGroupSelect('right')
        });

        $('#hitit').on('click', playerApp.handleTap);

        $('#debug-start').on('click', playerApp.startGame);

    }

    function handleGroupSelect(side) {
        $('div[class^="screen--"]').addClass('is-team-' + side);
        playerApp.handleTeamChoice(side);
    }

    function setIntensity() {

        var percentage = (playerApp.gameState.intensity / playerApp.config.maxIntensity) * 100;
        
        if(percentage > 0) {
            console.log(percentage);
            $('.click-bar__meter').css('width', (percentage + '%'));
        }

    }

    function goToScreen(screen) {

        //return screen name
        console.log('go to screen', screen);

        //disable active screen
        $('div[class^="screen--"].is-active').removeClass('is-active').addClass('is-not-active');

        //enable active screen
        if(screen == 'choose-side') {
            $('.screen--side').addClass('is-active');
        } else if(screen == 'about-to-start') {
            $('.screen--about-to-start').addClass('is-active');
        } else if(screen == 'play') {
            $('.screen--play').addClass('is-active');
        } else if (screen == 'score') {
            $('.screen--score').addClass('is-active');
            buildScoreScreen();
        }

    }

    function buildScoreScreen() {
        console.log('build score screen');
        
        $('#score-total-taps').html(playerApp.gameState.player.score);
        $('.score-avatar img:eq(0)').attr('src', playerApp.gameState.player.photo);

    }

    return {
        init: init,
        goToScreen: goToScreen,
        setIntensity: setIntensity
    }
  
})();

    