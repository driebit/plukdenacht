#Pluk de Nacht

##Setup

check out the project into a folder in the 'game_modules' folder

in console, in the checkout: npm install --global gulp

in console, in the checkout: npm install

##Development
in console, in the checkout: gulp

##Usage

in console: open ./Multiplay.app

go to http://localhost:9090/screen to start the canvas app

wait for the game to start, then go to http://localhost:9090/ to start a game client

##Production builds
in console: gulp build-production

in htdocs/index.html: comment out the 'dev javascript' block, comment in the 'prod javascript' block

in htdocs/gui.html: comment out the 'dev javascript' block, comment in the 'prod javascript' block

