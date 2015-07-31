var ui = (function() {

    function init() {

        console.log('init ui module');

        FastClick.attach(document.body);

        //handlers
        $('#player-left').on('click', function() {
            playerApp.handleTeamChoice('left');
        });
        
        $('#player-right').on('click', function() {
            playerApp.handleTeamChoice('right');
        });

        $('#hitit').on('click', playerApp.handleTap);

        $('#debug-start').on('click', playerApp.startGame);

    }

    function setIntensity() {
        var percentage,
            intensity = playerApp.gameState.intensity;

        if(intensity > 0) {
            percentage = (playerApp.gameState.intensity / playerApp.config.maxIntensity) * 100;
        } else {
            percentage = 0;
        }
        
        $('.click-bar__meter').css('width', (percentage + '%'));

    }

    function goToScreen(screen) {

        console.log('go to screen', screen);

        //disable active screen
        $('div[class^="screen--"].is-active').removeClass('is-active').addClass('is-not-active');

        //enable active screen
        if(screen == 'choose-side') {
            $('.screen--side').addClass('is-active');
        } else if(screen == 'about-to-start') {
            $('.screen--about-to-start').addClass('is-active');
        } else if(screen == 'play') {
            var side = playerApp.gameState.player.team;
            $('div[class^="screen--"]').addClass('is-team-' + side);
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

    