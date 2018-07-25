var app = new Vue({
    el: '#app',
    data: {
        gameView: [],
        rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        cols: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        players: {},
    },

    created() {
        this.fetchData();

    },
    methods: {
        fetchData: function () {
            let id = window.location.search.split("=")[1];
            let url = '/api/game_view/' + id;
            fetch(url, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => response.json())
                .then(function (data) {
                    console.log(data);
                    app.gameView = data;
                    app.displayShips();
                    app.getUsername();
                })
        },

        displayShips: function () {
            let ships = app.gameView.ships;
            for (var i = 0; i < ships.length; i++) {
                for (let j = 0; j < ships[i].locations.length; j++) {
                    let shipLocation = ships[i].locations[j];
                    console.log(shipLocation);
                    //shiplocation id - dinamically calculates the id as you move on the grid with every cell - it's a special :id="r+c
                    let cell = document.getElementById(shipLocation).classList.add("ship-location");
                }

            }
        },
        getUsername: function () {
            let gamePlayers = app.gameView.game.gamePlayers;
            let player1 = gamePlayers["0"].player.email;
            let player2;
            if (gamePlayers[1].player.email){
             player2 = gamePlayers[1].player.email;
            }
            else{
                player1 = gamePlayers["0"].player.email;
                player2 = '';
            }
            app.players = {
                player1: player1,
                player2: player2
            }
        }
    }

});



//    data: function(){
//        let letterLoc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
//        let numberLoc =["1", "2", "3", "4". "5", "6", "7", "8", "9", "10"];
//    }
//})

//$.ajax("/api/game_view/1").done(function (json) {
//            data = json;
//            createTable();
//});
//
//function createTable(){
//    var table = '';
//    var row = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
//    var column = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//    for (var r = 0; r < row.length; r++){
//        table += '<tr>';
//        for (var c = 0; c < column.length; c++){
//            table += '<td>'+ c +'</td>';
//        }  
//     document.write('<table'+ table + '</table>');
//}
//    
//
////            function createNod(el) {
////                return document.createElement(el);
////            }
////
////            function append(parent, el) {
////                return parent.appendChild(el);
////            }
////
////            let letterLoc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
////            let numberLoc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
////
////            function createTable(letterLoc, numberLoc) {
////                for (let i = 0; i < letterLoc.length; i++) {
////                    let row = createNod("tr");
////                    for (var h = 0; j < numberLoc.length; i++) {
////                        let cell = createNod("td");
////                        append(row, cell);
////                    }
////                }
////            }
