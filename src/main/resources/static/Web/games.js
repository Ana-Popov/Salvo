//VUE JS 
var app = new Vue({
    el: '#app',
    data: {
        leaderboard: [],
        //        games: [],
        players: [],
        win: 0,
        lose: 0,
        total: 0,
        userName: '',
        password: '',
        message: '',
        isLoggedIn: false,
        status: [],
    },
    created() {
        this.getGames();
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            let url = '/api/leaderboard';
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
        login: function () {
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
                    app.status = data;
                    if (app.status.status == 200) {
                        app.message = 'Welcome' + app.userName;
                        app.getGames();
                    } else {
                        app.message = 'Login failed. Please try again';
                    }
                    console.log(app.userName);
                    console.log(data)
                })
                .catch(function (fail) {
                    console.log("error")
                })
        },
        getGames: function () {
            let url = '/api/games';
            fetch(url, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => response.json())
                .then(function (data) {
                    console.log(data)
                    if (data.player) {
                        app.isLoggedIn = true;
                    } else {
                        app.isLoggedIn = false;
                    }

                })
        },
        
        logout: function(){
            fetch("/api/logout")
        }



        //        login: function (evt) {
        //            evt.preventDefault();
        //            var form = evt.target.form;
        //            $.post("/api/login", {
        //                    username: form["username"].value,
        //                    password: form["password"].value
        //                })
        //                .done(function (d) {
        //                    console.log(d)
        //                })
        //                .fail(function (d) {
        //                    console.log(d)
        //                });
        //        },
        //        logout: function (evt) {
        //            evt.preventDefault();
        //            $.post("/api/logout")
        //                .done(function (d) {
        //                    console.log(d)
        //                })
        //                .fail(function (d) {
        //                    console.log(d)
        //                });
    },

    //            for(var i = 0; i< players.length; i++){
    //                let wins = players[i].win;
    //                let tie = players[i].tie;
    //                wins.sort(function(a, b){
    //                    return a-b});
    //                } this.win = wins;
    //            }



    //end methods

    //fetch - api/games START
    //        fetchData: function () {
    //            let url = '/api/games';
    //            fetch(url, {
    //                method: "GET",
    //                credentials: "include",
    //            })
    //                .then((response) => response.json())
    //                .then(function (data) {
    //                    console.log(data)
    //                    app.gamesJson = data;
    //                    app.getGames();
    //                })
    //        },
    //        getGames: function () {
    //            let array = [];
    //            let games = this.gamesJson;
    //            let playerTwo = "";
    //            let playerOne = "";
    ////            let player2 = "";
    //            for (var i = 0; i < games.length; i++) {
    //                let date = new Date(games[i].created);
    //                dates = date.toLocaleString();
    //                if (games[i].gamePlayers.length > 1) {
    //                    playerOne = games[i].gamePlayers[0].player.email + " vs ";
    //                    playerTwo = games[i].gamePlayers[1].player.email;
    ////                    playerTwo = " vs " + player2;
    ////                    let playerTwo = " vs " + player2;
    //                } else {
    //                    playerOne = games[i].gamePlayers[0].player.email;
    //                   playerTwo = "";
    //
    //                }
    //                
    //                let object = {
    //                    created: dates,
    //                    playerOne: playerOne,
    //                    playerTwo: playerTwo,
    //                }
    //                array.push(object);
    //                console.log(object)
    //            }
    //            this.games = array;
    //
    //        },
    //
    //    } //END api/games fetch 

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
