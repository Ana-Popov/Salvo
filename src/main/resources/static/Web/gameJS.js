var app = new Vue({
    el: '#app',
    data: {
        gameView: [],
        gameObject: [],
        rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        cols: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        players: {},
        hits: [],
        opponentTable: false,
        opponentTable: false,
        vertical: false,
        battleships: [],
        shipsA: [],
    }, //end data

    created() {
        this.fetchData();
        //        this.getShipLocation();

    },
    methods: fetchData: function () {
            let id = window.location.search.split("=")[1];
            let url = '/api/game_view/' + id;
            fetch(url, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => response.json())
                .then(function (data) {

                    app.gameView = data.gameView;
                    console.log(app.gameView);

                    app.gameObject = app.gameView.game.gamePlayers;
                    app.displayShips();
                    app.getUsername();
                    app.displaySalvoes(app.gameView['userSalvoes'], 'E')
                    if (app.gameObject.length == 2) {
                        app.opponentTable = true;
                        app.displaySalvoes(app.gameView['opponentSalvoes'], 'U')
                    } else {
                        app.opponentTable = false;
                    }

                })
        },
//        displayShips: function () {
//            let ships = app.gameView.ships;
//            for (let i = 0; i < ships.length; i++) {
//                for (let j = 0; j < ships[i].locations.length; j++) {
//                    let shipLocation = ships[i].locations[j];
//                    console.log(shipLocation);
//                    //shiplocation id - dinamically calculates the id as you move on the grid with every cell - it's a special :id="r+c
//                    let cell = document.getElementById('U' + shipLocation).classList.add("ship-location");
//                }
//            }
//        },
//        getShipLocation: function (locCell) {
//            let shipLoc = document.getElementById(locCell);
//            if (shipLoc.classList.contains("shipTypeLabel")) {
//                shipLoc.classList.remove("shipTypeLabel")
//                shipLoc.classList.add("cellShip");
//            }
//
//
//        },