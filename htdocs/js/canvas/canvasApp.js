var canvasApp = (function() {

    var me = this,
        gamestate;
       

    function init () {

        console.log('init canvas app, start init other modules');

        gamestate = createGame();
        //gamestate = fakeGame();

    }
    
    function fakeGame() {
        return {
            players: [
                {name: "Dirk",
                 team: 'A',
                 score: 10},
                {name: "Danny",
                 team: 'A',
                 score: 100},
                {name: "Dorien",
                 team: 'B',
                 score: 50},
                {name: "Casper",
                 team: 'B',
                 score: 21}
            ]
        }
    }

    function createGame() {
        return {
            players: []
        }
    }

    function addPlayer(id) {
        return gamestate.players.push({id: id});
    }

    function getPlayer(id) {
        return $.grep(gamestate.players, function(e){ return e.id == id; })[0];
    }
    
    function setPlayerProp(id, name, value) {
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
    
    
    
    function startGame() {
        gamestate.players.map(function(player) {
          
        })
    }
    
    function endGame() {
        // gamestate.players.map(function(player) {
        //   player.set({running: 0});
        // })
    }
    
    
    function currentTeamTotal(team) {
        t = gamestate.players.filter(function(player) {
            return player.team === team;
        }).map(function(player) {
            return player.score;
        }).reduce(function(total, next) {
            return total + next;
        });
        return t;
    }
    
    // Rendering

    function renderPlayers() {
        
        gamestate.players.filter(function(player) {
            return player.team == "A";
        }).map(function(player) {
            $('#playersTeamA').append(
                $('<li>').attr('score', player.score).append(player.name)
            );
        })
        
        gamestate.players.filter(function(player) {
            return player.team == "B";
        }).map(function(player) {
            $('#playersTeamB').append(
                $('<li>').attr('score', player.score).append(player.name)
            );
        })
        
    }
    
    function renderTotals() {
        $("#totalTeamA").html(currentTeamTotal('A'));
        $("#totalTeamB").html(currentTeamTotal('B'));
    }
    
    function render(){
        renderPlayers();
        renderTotals();
    }
    
    function state() {
        return gamestate;
    }

    return {
        init: init,
        render: render,
        addPlayer: addPlayer,
        getPlayer: getPlayer,
        setPlayerProp: setPlayerProp,
        currentTeamTotal: currentTeamTotal,
        startCountDown: startCountDown,
        state: state
    }

})();
