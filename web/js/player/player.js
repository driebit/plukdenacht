var player = (function() {

    var me = this,

    function init () {
        console.log('init player app, start init other modules');

        imageCapture.init();

        //handlers
        $('#capture').on('click', handleCapture);

        imageCapture.showStream();

        console.log(test);
    
    }


    function handleCapture() {
        var image = imageCapture.captureImage();
    }

    return {
        init: init
    }

})();
