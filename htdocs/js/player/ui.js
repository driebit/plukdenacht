var ui = (function() {

    function init() {

        //console.log('init ui module');

        FastClick.attach(document.body);

        //handlers
        $('#player-left').on('click', function() {
            playerApp.handleTeamChoice('left');
        });
        
        $('#player-right').on('click', function() {
            playerApp.handleTeamChoice('right');
        });

        $('#hitit').on('mousedown touchstart', function(e) {

            e.stopPropagation(); 
            e.preventDefault();

            $('.btn-play').removeClass('is-active').addClass('is-active');

            document.getElementById('sound').play();

            playerApp.handleTap(e);
        });

        $('#hitit').on('mouseup touchend', function(e) {

            e.stopPropagation(); 
            e.preventDefault();

            $('.btn-play').removeClass('is-active');
        });

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

        //disable active screen
        $('div[class^="screen--"].is-active').removeClass('is-active').addClass('is-not-active');

        //enable active screen
        if(screen == 'choose-side') {
            $('.screen--side').addClass('is-active');
        } else if(screen == 'rejected') {
            $('.screen--rejected').addClass('is-active');
        } else if(screen == 'about-to-start') {
            $('.screen--about-to-start').addClass('is-active');
        } else if(screen == 'play') {
            var side = playerApp.gameState.player.team;
            $('div[class^="screen--"]').addClass('is-team-' + side);
            
            if(side === 'left') {
                $('#eagle').attr({id: 'sound'});
            } else {
                $('#bull').attr({id: 'sound'});
            }

            $('.screen--play').addClass('is-active');
            
        } else if (screen == 'score') {
            $('.screen--score').addClass('is-active');
            buildScoreScreen();
        }

    }

    function buildScoreScreen() {
        
        $('#score-total-taps').html(playerApp.gameState.player.score);

        if(playerApp.gameState.player.photo) {
            $('.score-avatar').show();
            $('.score-avatar img:eq(0)').attr('src', playerApp.gameState.player.photo);
        } else {
            $('.score-avatar').hide();
        }

    }

    return {
        init: init,
        goToScreen: goToScreen,
        setIntensity: setIntensity
    }
  
})();

    