//VUE JS 
var app = new Vue({
    el: '#app',
    data: {
        leaderboardJson: [],
//        games: [],
//        players: [],

    },
    created() {
        this.fetchData();
    },

    methods: {
            fetchData: function(){
                let url = '/api/leaderboard';
                fetch(url, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => response.json())
                .then(function (data){
                    console.log(data)
                    app.leaderboardJson = data;
                })
            },
        
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
}
});//end Vue



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
