var imageCapture = (function() {

    var dataUrl,
        video;

    function init() {
    }

    function showStream() {

        navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;
        if (navigator.getUserMedia) {

           navigator.getUserMedia(
            { video: true }, function(stream) {

                video = document.getElementById("video");
                video.src = window.URL ? window.URL.createObjectURL(stream) : stream;
                video.play();

            }, 
            function() {
                console.log(e); 
            }                 

           );
        } else {
           console.log("getUserMedia not supported");
        }
    }

    function captureImage() {
        var canvas = document.createElement('canvas');
        canvas.id = 'hiddenCanvas';
        //add canvas to the body element
        document.body.appendChild(canvas);
        //add canvas to #canvasHolder
        document.getElementById('canvasHolder').appendChild(canvas);
        
        var ctx = canvas.getContext('2d');

        canvas.width = 300;
        canvas.height = 300;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        //save canvas image as data url
        dataUrL = canvas.toDataURL('image/jpeg', 0.75);
        //set preview image src to dataURL
        document.getElementById('preview').src = dataUrL;
        // place the image value in the text box
        //document.getElementById('imageToForm').value = dataURL;

        return dataUrL;

     }

     return {
        init: init,
        showStream: showStream,
        captureImage: captureImage
     }

})();

    