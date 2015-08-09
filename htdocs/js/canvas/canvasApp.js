var canvasApp = (function() {

    var me = this,
        gamestate,
        currentRow = {
            'left': 0,
            'right': 0
        },
        maxMembersInRow = 20,
        maxPlayers = 100,
        gameStartMessage = 'Go to<br><span>play.mooren.tv</span><br>on your phone!';


    function init () {

        console.log('init canvas app, start init other modules');

        gamestate = createGame();
        //gamestate = fakeGame();

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

        gamestate.players[id] = {
            id: id,
            score: 0
        };

        return gamestate;
    }

    function getPlayer(id) {
        return gamestate.players[id];
    }
    
    function setPlayerProp(id, name, value) {
        //debugLog('setplayerprop ' + name + ' : ' + value);
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

            if(display) display.text(minutes + ":" + seconds);

            if (--timer < 0) {
                timer = duration;
                callback();
                clearInterval(interval);
            }
        }, 1000);
    }  
    
    function startPreGame() {
        $('#countdown_label').html(gameStartMessage);

        var startTime = $('body').data('starttime');

        startCountDown(startTime, $('#countdown__minutes'), startGame);
    }
    
    function startGame() {
        document.querySelector("#countdown_label").innerText = "Pull!";
        Object.keys(gamestate.players).map(function(playerId) {           
            var player = getPlayer(playerId);
            player.channel.set('isrunning', 1);
        })

        var gameTime = $('body').data('gametime');
        
        startCountDown(gameTime, $('#countdown__minutes'), endGame);
    }
    
    function endGame() {
        document.querySelector("#countdown_label").innerText = "Stand by, calculating scores...";
        Object.keys(gamestate.players).map(function(playerId) {
            var player = getPlayer(playerId);
            player.channel.set('isrunning', 0);
        });
       

        //allow some extra time for the last client data to come in
        window.setTimeout(function() {

            gotoScreen('scores');

            var leftScore = relativeTeamTotal('left'),
                rightScore = relativeTeamTotal('right'),
                playersContainer = $('.canvas--scores__players'),
                winningTeam = null,
                scoreTime = $('body').data('scoretime');

            if(leftScore > rightScore) {
                $('.canvas--scores').addClass('left-won');
                $('.canvas--scores__title h1').html('the eagles won!');
                winningTeam = 'left';

            } else {
                $('.canvas--scores').addClass('right-won');
                $('.canvas--scores__title h1').html('the bulls won!');
                winningTeam = 'right';
            }        

            filterTeam(winningTeam).sort(function(a, b){
                return b.score - a.score;
            }).map(function(player) {
                if (player.photo && player.score != undefined) {
                    playersContainer.append('<li><img src="' + player.photo + '"><div>' + player.score + '</div></li>');
                }
            });

            startCountDown(scoreTime, null, postGame);

        }, 7000);

    }

    function postGame() {
        gotoScreen('endgame');
    }

    function filterTeam(team) {
        var players = Object.keys(gamestate.players).map(function(playerId){
            var player = getPlayer(playerId);
            return player;
        }).filter(function(player) {
            return player.team === team;
        });

        return players;
    }
    
    // Scoring
    
    function currentTotal() {

        var players = Object.keys(gamestate.players).map(function(playerId){
            var player = getPlayer(playerId);
            return player;
        });

        var t = players.map(function(player) {

            if(player.score) {
                return player.score;
            } else {
                return 0;
            }
            
        }).reduce(function(total, next) {
            return total + next;
        }, 0);
        return t;
    }
    
    function currentTeamTotal(team) {

        var players = Object.keys(gamestate.players).map(function(playerId){
            var player = getPlayer(playerId);
            return player;
        });

        var t = filterTeam(team).map(function(player) {

            if(player.score) {
                return player.score;
            } else {
                return 0;
            }
            
        }).reduce(function(total, next) {
            return total + next;
        }, 0);

        return t;
    }
    
    function relativeTeamTotal(team){

        var currentTotalNum = currentTotal();
        if(currentTotalNum == 0) return 50;
        return 100 * currentTeamTotal(team) / currentTotalNum; 
    }
     
    // Rendering

    function renderAddPlayer(id) {

        var player = getPlayer(id);
        var newplayer;
        
        if (player.photo) {
            newplayer = $('<li class="member"><img src="' + player.photo + '"></li>'); 
        } else {
            newplayer = $('<li class="member"></li>');
        }

        var theCurrentRow = currentRow[player.team],
            playerTeam = $('div[class^="player-wrapper__team-' + player.team + '"]'),
            currentMembersBlock = playerTeam.find('.block--' + theCurrentRow),
            currentMembersInBlock = currentMembersBlock.find('li').size();

         if(currentMembersInBlock + 1 > maxMembersInRow) {
             currentRow[player.team]++;
             // if(currentRow[player.team] % 2 != 0) {
             //     maxMembersInRow--;
             // }
             theCurrentRow = currentRow[player.team];
         }

        currentMembersBlock.append(newplayer);       
    }
    
    function renderTotals() {

        var left = relativeTeamTotal('left'),
            right = relativeTeamTotal('right');

        $("#totalTeamA").height(left + "%");
        $("#totalTeamB").height(right + "%");

    }

    function renderGroups() {

        var right = relativeTeamTotal('right'),
            wrapper = $('.teams-wrapper');

       wrapper.css({
            'margin-left': 160 * right / 100
        });

    }
    
    function render(){
        renderTotals();
        renderGroups();
    }
    
    function state() {
        return gamestate;
    }


    function gotoScreen(screen) {

        $('div[class^="canvas--"]').removeClass('is-active').addClass('is-not-active');

        //enable active screen
        if(screen == 'scores') {
            $('.canvas--scores').removeClass('is-not-active').addClass('is-active');
        } else if(screen == 'endgame') {
            $('.canvas--endgame').removeClass('is-not-active').addClass('is-active');
        }

    }

    function debugLog(msg) {
        
        if($('#debug').size() < 1) return false;

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
        debugLog: debugLog,
        gotoScreen: gotoScreen,
        renderAddPlayer: renderAddPlayer,
        startPreGame: startPreGame,
        maxPlayers: maxPlayers
    }

})();
