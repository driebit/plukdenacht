var ui = (function() {

    function init() {

        console.log('init ui module');

        $('#player-left').on('click', function() {
            handleGroupSelect('left')
        });
        
        $('#player-right').on('click', function() {
            handleGroupSelect('right')
        });

    }


    function handleGroupSelect(side) {
        console.log('group selected ' + side);

    }


    function goToScreen(screen) {

        //return screen name

    }


    return {

        init: init,
        goToScreen: goToScreen

    }
  
})();

    