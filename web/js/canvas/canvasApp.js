var canvasApp = (function() {

    var me = this,
        gamestate;
       

    function init () {

        console.log('init canvas app, start init other modules');

        // gamestate = createGame();
        gamestate = fakeGame();

        //socket

        var docLoc = document.location,
            port   = docLoc.port,
            socketUrl = '//' + docLoc.hostname;

        if (port !== '') {
            socketUrl += ':' + port;
        }

        socketUrl += '/canvas';

        socket = io(socketUrl);


        // //handlers
        socket.on('message', function (data) {

            if(data.type == 'handle_team_choice') {
                addPlayerToTeam(data.player, team);
            }

        });

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

    function addPlayer(player) {
        gamestate.players.push(player);
    }
    
    function addPlayerToTeam(player, team) {
        var player = getPlayer(id);
        player.team = team;
    }
    
    function startGame() {
        gamestate.players.map(function(player) {
          player.set({running: 1});
        })
    }
    
    function endGame() {
        gamestate.players.map(function(player) {
          player.set({running: 0});
        })
    }
    
    function addClicks(player, count) {
        player.score += count;
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

    return {
        init: init,
        render: render,
        total: currentTeamTotal,
        state: gamestate
    }

})();
