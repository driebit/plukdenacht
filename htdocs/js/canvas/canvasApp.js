var canvasApp = (function() {

    var me = this,
        gamestate,
        currentRow = {
            'left': 0,
            'right': 0
        },
        maxMembersInRow = 20;
       

    function init () {

        console.log('init canvas app, start init other modules');

        gamestate = createGame();
        // gamestate = fakeGame();

    }
    
    function fakeGame() {
        return {
            players: [
                {name: "Dirk",
                 team: 'left',
                 score: 10},
                {name: "Danny",
                 team: 'left',
                 score: 100},
                {name: "Dorien",
                 team: 'right',
                 score: 50},
                {name: "Casper",
                 team: 'right',
                 score: 21}
            ]
        }
    }

    function createGame() {
        return {
            players: {}
        }
    }

    function addPlayer(id) {

        //TODO: check if player exists in array, then don't add it
        
        gamestate.players[id] = {id: id};
        return gamestate;
    }

    function getPlayer(id) {
        return gamestate.players[id];

        //return $.grep(gamestate.players, function(e){ return e.id == id; })[0];
    }
    
    function setPlayerProp(id, name, value) {
        debugLog('setplayerprop ' + name + ' : ' + value);
        return getPlayer(id)[name] = value;
    }
    
    function addClicks(player, count) {
        player.score += count;
    }
    
    // Game state changes
    
    function startCountDown(duration, display, callback) {
        var timer = duration, minutes, seconds;
        var interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.text(minutes + ":" + seconds);

            if (--timer < 0) {
                timer = duration;
                callback();
                clearInterval(interval);
            }
        }, 1000);
    }  
    
    function startPreGame() {
        document.querySelector("#countdown_label").innerText = "Starting in...";
        startCountDown(60 * 0.2, $('#countdown__minutes'), startGame);
    }
    
    function startGame() {
        document.querySelector("#countdown_label").innerText = "Pull!";
        Object.keys(gamestate.players).map(function(playerId) {           
            var player = getPlayer(playerId);
            player.channel.set('isrunning', 1);
        })
        
        startCountDown(60 * 1, $('#countdown__minutes'), endGame);
    }
    
    function endGame() {
        document.querySelector("#countdown_label").innerText = "Finished!";
        Object.keys(gamestate.players).map(function(playerId) {
            var player = getPlayer(playerId);
            player.channel.set('isrunning', 0);
        });
    }
    
    // Scoring
    
    function currentTotal() {

        //if(gamestate.players.length == 0) return 0;

        var players = Object.keys(gamestate.players).map(function(playerId){
            var player = getPlayer(playerId);
            return player;
        });

        var t = players.map(function(player) {
            return player.score;
        }).reduce(function(total, next) {
            return total + next;
        }, 0);
        return t;
    }
    
    function currentTeamTotal(team) {

        //if(gamestate.players.length == 0) return 0;

        var players = Object.keys(gamestate.players).map(function(playerId){
            var player = getPlayer(playerId);
            return player;
        });

        var t = players.filter(function(player) {
            return player.team === team;
        }).map(function(player) {
            return player.score;
        }).reduce(function(total, next) {
            return total + next;
        }, 0);

        
        return t;
    }
    
    function relativeTeamTotal(team){

        // console.log('currentTeamTotal: ' + currentTeamTotal(team));
        // console.log('currentTotal: ' + currentTotal());

        return 100 * currentTeamTotal(team) / currentTotal(); 
    }
     
    // Rendering

    function renderAddPlayer(id) {

        var player = getPlayer(id);
   
        //TODO: fallback photo

        var newplayer = $('<li class="member"><img src="' + player.photo + '"></li>')

        var theCurrentRow = currentRow[player.team],
            playerTeam = $('div[class^="player-wrapper__team-' + player.team + '"]'),
            currentMembersBlock = playerTeam.find('.block--' + theCurrentRow),
            currentMembersInBlock = currentMembersBlock.find('li').size();

        if(currentMembersInBlock + 1 > maxMembersInRow) {
            currentRow[player.team]++;
            if(currentRow[player.team] % 2 != 0) {
                maxMembersInRow--;
            }
            theCurrentRow = currentRow[player.team];
        }

        currentMembersBlock.append(newplayer);  
        
    }
    
    function renderTotals() {

        var left = relativeTeamTotal('left'),
            right = relativeTeamTotal('right');

        $("#totalTeamA").height(left + "%");
        $("#totalTeamB").height(right + "%");

        debugLog('team left: ' + left + ' right: ' + right);
    }
    
    function render(){
        renderTotals();
    }
    
    function state() {
        return gamestate;
    }

    function debugLog(msg) {
        
        var date = new Date();

        $('#debug').val($('#debug').val() + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' - ' + msg + '\n');
        $('#debug').scrollTop($('#debug')[0].scrollHeight);

    }

    return {
        init: init,
        render: render,
        addPlayer: addPlayer,
        getPlayer: getPlayer,
        setPlayerProp: setPlayerProp,
        currentTeamTotal: currentTeamTotal,
        relativeTeamTotal: relativeTeamTotal,
        startCountDown: startCountDown,
        state: state,
        renderAddPlayer: renderAddPlayer,
        startPreGame: startPreGame,
        debugLog: debugLog
    }

})();
