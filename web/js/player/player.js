var player = (function() {

    var me = this,
        currentScreen;


    function init () {

        console.log('init player app, start init other modules');

        imageCapture.init();
        ui.init();

        //handlers
        //$('#capture').on('click', handleCapture);

        imageCapture.showStream();

    }


    function handleCapture() {
        var image = imageCapture.captureImage();
    }

    function handleTap() {


    }

    





    return {
        init: init
    }

})();
