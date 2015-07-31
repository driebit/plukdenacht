#Pluk de Nacht

Simple setup which serves static assets and implements a proof of concept socket thingy

##Usage

in console: open ./Multiplay.app
goto http://localhost:9090/screen to start the canvas app
wait for the game to start, then go to http://localhost:9090/ to start a game client

##Production builds
in console: build-production
in htdocs/index.html: comment out the 'dev javascript' block, comment in the 'prod javascript' block
in htdocs/gui.html: comment out the 'dev javascript' block, comment in the 'prod javascript' block

