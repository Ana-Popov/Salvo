//VUE JS 
var app = new Vue({
    el: '#app',
    data: {
        leaderboard: [],
        games: [], //this contains an array with player1, player2 IDs and the games they are playing;
        createGame: [], //this contains the New Game data - gameId, GpId and date 
        newGamePlayerId: '',
        players: [],
        gameId: '',
        win: 0,
        lose: 0,
        total: 0,
        userName: '',
        password: '',
        message: '',
        isLoggedIn: false,
        status: [],
        loggedPlayer: '',
        joinButton: false,
        playButton: false,
        islogin: false,
        newData: '',
        gameIdToJoin: "",
        opponentTable: true, // show
        //        scrollPosition: window.pageYOffset,
    },

    created() {
        this.getData();
        this.fetchLeaderboard();
    },
    methods: {
        getData: function () {
            let url = "/api/games";
            fetch(url, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => response.json())
                .then(function (data) {
                    console.log(data);
                    app.status = data;

                    if (data.player) {
                        app.isLoggedIn = true;
                        app.message = 'Welcome ' + data.player.email;
                        app.loggedPlayer = app.status.player.id;
                    } else {
                        app.isLoggedIn = false;
                    }

                    app.getGames();

                })
        },
        newGame: function () {
            fetch("/api/games", {
                    credentials: "include",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                .then((response) => response.json())
                .then(function (data) {
                    console.log(data);
                    app.newData = data.newGame;
                    app.opponentTable = false;
                    //                    app.createGame = newData;
                    console.log(app.newData)
                    app.newGamePlayerId = app.newData.gpId;
                    console.log(app.newGamePlayerId);
                    location.replace("/web/game.html?gp=" + app.newGamePlayerId)

                })
            //
            //    } //END api/games fetch 

        },

        //        create div: function () {
        //            let divI = document.createElement('div');
        //            divI.className = "emptyDiv";
        //            document.getElementsByTagName('body')[0].appendChild(divI);
        //
        //            DivI.innerHTML = "I'm the first div";
        //
        //            // Now create and append to iDiv
        //            let innerDiv = document.createElement('div');
        //            innerDiv.className = 'block-2';
        //
        //            // The variable iDiv is still good... Just append to it.
        //            DivI.appendChild(innerDiv);
        //            innerDiv.innerHTML = "I'm the inner div";
        //        },

        fetchLeaderboard: function () {
            let url = "/api/leaderboard";
            fetch(url, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => response.json())
                .then(function (data) {
                    console.log(data)
                    app.players = data.sort((a, b) => b.total - a.total);
                })
        },

        login: function (wayToLogIn) {
            //            this.userName = document.getElementById("input").value - Javascript. - v-model with vue.js

            fetch("/api/login", {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'userName=' + this.userName + '&password=' + this.password,
                })
                .then(function (data) {
                    if (data.status == 200) {
                        if (wayToLogIn != "popup") {
                            if (data.player = !null) {
                                app.getData();
                                app.message = "Welcome " + app.userName;
                                app.islogin = false;
                                app.getGames();
                            }
                        } else {
                            app.joinGame(app.gameIdToJoin)
                        }
                    } else if (data.status == 401) {
                        app.message = 'Incorrect username or password';
                    }

                    console.log(app.userName);
                    console.log(data)

                })
                .catch(function (fail) {
                    console.log("error")
                })
        },



        getPlayerUrl: function () {
            var stateObject = {
                id: app.loggedPlayer
            };
            var title = "Game View" + app.loggedPlayer;
            var newUrl = "/web/game.html?gp=" + app.loggedPlayer;
            history.pushState(stateObject, title, newUrl);
        },

        logout: function () {
            fetch("/api/logout", {
                    credentials: "include",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'userName=' + this.userName + '&password=' + this.password,
                })
                .then(function (data) {
                    app.status = data;
                    app.isLoggedIn = false;
                    app.getData();
                    app.islogin = false;
                    app.message = "See you later, Captain!";
                })
                .catch(function (fail) {
                    console.log("error")
                })
        },

        signUp: function () {
            fetch("/api/players", {
                    credentials: "include",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'userName=' + this.userName + '&password=' + this.password,
                })
                .then(function (data) {
                    console.log(data)
                    if (data.status == 201) {
                        app.isLoggedIn = true;
                        app.getGames();
                        app.login();
                        app.message = 'Welcome ' + this.userName;
                        app.islogin = false;

                    } else if (data.status == 409) {
                        app.message = "User already exists";
                    } else if (data.status == 401) {
                        app.message = "Incorrect username or password";
                    } else {
                        app.message = 'Information incomplete. Please try again';
                    }
                })
        },

        //        fetchData: function () {
        //            let url = '/api/games';
        //            fetch(url, {
        //                    method: "GET",
        //                    credentials: "include",
        //                })
        //                .then((response) => response.json())
        //                .then(function (data) {
        //                    console.log(data)
        //                    app.gamesJson = data;
        //                    app.getGames();
        //                })
        //        },

        closePopUpLogIn: function () {
            this.islogin = false;
            //            app.scrollToTop();
        },
        openPopUpLogIn: function (id) {
            this.islogin = true;
            app.gameIdToJoin = id;
        },

        loginFromPopUp: function () {

            let thisGame = app.games;
            console.log(app.games)
            //                if (app.userName !== thisGame.playerOne && app.username !== thisGame.playerTwo) {
            app.login("popup");

            //                } else {
            //                    alert("You cannot play against yourself. Please exit the login screen and join another game");
            //                }


        },


        getGames: function () {
            let array = [];
            let games = this.status.game;
            let playerTwo = "";
            let playerOne = "";
            let playerOneId = "";
            let playerTwoId = "";
            let status = "";
            //            let player2 = "";
            for (var i = 0; i < games.length; i++) {
                let date = new Date(games[i].created);
                let gp = games[i].gamePlayers;
                let gameId = app.status.game[i].id;
                console.log(gameId);
                let dates = date.toLocaleString();
                if ((gp.length == 2 && gp[0].player.id == this.loggedPlayer)) {
                    status = "Play";
                    playerOneId = gp[0].gpId;
                    playerOne = gp[0].player.email + ' vs';
                    playerTwo = gp[1].player.email;
                    playerTwoId = gp[1].gpId;

                } else if (gp.length == 2 && gp[1].player.id == this.loggedPlayer) {
                    status = "Play"
                    playerOneId = gp[1].gpId;
                    playerOne = gp[1].player.email + ' vs';
                    playerTwo = gp[0].player.email;
                    playerTwoId = gp[0].gpId;
                } else if (gp.length == 1 && gp[0].player.id == this.loggedPlayer) {
                    status = "Play"
                    playerOne = gp[0].player.email;
                    playerTwo = "";
                    playerOneId = gp[0].gpId;
                    playerTwoId = "";

                } else if (gp.length == 1 && gp[0].player.id != this.loggedPlayer) {
                    status = "Join";
                    playerOne = gp[0].player.email;
                    playerTwo = "";
                    playerOneId = gp[0].gpId;
                    playerTwoId = "";

                } else {
                    status = "IN GAME";
                    playerOneId = gp[0].gpId;
                    playerOne = gp[0].player.email + ' vs';
                    playerTwo = gp[1].player.email;
                    playerTwoId = gp[1].gpId;
                }
                console.log(status);
                let object = {
                    created: dates,
                    playerOne: playerOne,
                    playerTwo: playerTwo,
                    playerOneId: playerOneId,
                    playerTwoId: playerTwoId,
                    status: status,
                    gameId: gameId,

                };
                array.push(object);

            }
            this.games = array;

        },

        getGameUrl: function () {
            var stateObject = {
                id: app.gameId
            };
            var title = "Joined Game" + app.gameId;
            var newUrl = "/web/game.html?gp=" + app.gameId;
            history.pushState(stateObject, title, newUrl);
        },

        joinGame: function (id) {
            fetch("/api/game/" + id + "/players", {
                    credentials: "include",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                .then(function (data) {
                    data.json()
                        .then(function (data) {
                            console.log(data)
                            //                            location.replace("/web/game.html?gp=" + data.gpId)
                            //                            app.joinedGameData = data.game;
                            //                            console.log(app.joinedGameData);
                            //                            if (data.game.gamePlayers.length > 1) {
                            //                                app.opponentTable = true;
                            //                            } else {
                            //                                app.opponentTable = false;
                            //                            }
                        })
                    //
                    //    } //END api/games fetch 
                })
        },

        scrollToTop: function () {
            window.scrollTo(0, 0);
        },
        //        postShips: function () {
        //            fetch("/api/games/players/" + id + "/ships", {
        //                    credentials: "include",
        //                    method: 'POST',
        //                    headers: {
        //                        'Accept': 'application/json',
        //                        'Content-Type': 'application/json'
        //                    },
        //                    body: JSON.stringify([{
        //                        type: "destroyer",
        //                        locations: ["A1", "A2", "A3", "A4", "A5"]
        //        }]),
        //                })
        //                .then(r => r.json())
        //                .then(r => console.log(r))
        //                .catch(function (fail) {
        //                    console.log("error", fail)
        //                })
        //        }
        //



        //        

    } //end methods
}); //end Vue

////VANILLA JAVASCRIPT
//document.addEventListener("DOMContentLoaded", function () {
//    const ol = document.getElementById("games");
//    const url = '/api/games';
////    fetch(url,{
//////        'credentials': 'included'
////    })
//    fetch(url)
//        .then(resp => resp.json()) //transform data into json 
//        .then(function (data) {
//            //code here
//        console.log(data)
//        let games = data;
//        return games.map(function(game){
//            let li = createNode("li");
//            li.innerHTML = game.created;
//            ol.append(li);
//        })
//
//        })
//        .catch(function (error) {
//            console.log('failed to load, try again', error);
//        });
//})
//
////function creates a type of element passed in the parameter
//function createNode(element) {
//    return document.createElement(element);
//}
////append the second el to its parent on the DOM 
//function append(parent, el) {
//    return parent.appendChild(el);
//}
