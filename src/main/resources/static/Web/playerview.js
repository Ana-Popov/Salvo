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
                displayShips: function () {
                    let ships = app.gameView.ships;
                    for (let i = 0; i < ships.length; i++) {
                        for (let j = 0; j < ships[i].locations.length; j++) {
                            let shipLocation = ships[i].locations[j];
                            console.log(shipLocation);
                            //shiplocation id - dinamically calculates the id as you move on the grid with every cell - it's a special :id="r+c
                            let cell = document.getElementById('U' + shipLocation).classList.add("ship-location");
                        }
                    }
                },
                getShipLocation: function (locCell) {
                    let shipLoc = document.getElementById(locCell);
                    if (shipLoc.classList.contains("shipTypeLabel")) {
                        shipLoc.classList.remove("shipTypeLabel")
                        shipLoc.classList.add("cellShip");
                    }


                },

                rules: function (array) {
                    let tableGrid = [];
                    for (var i = 0; i < array.length; i++) {
                        let oneShip = array[i];
                        let type = oneShip.type;
                        let location = oneShip.location;
                        for (let j = 0; j < location.length; j++) {
                            console.log(location);
                            if (!this.alphaNumeric.include(location[j])) {
                                var index = array.indexOf(oneShip);
                                if (index > -1) {
                                    array.splice(index, 1);
                                } else {
                                    tableGrid.push(location[j]);
                                }
                            }
                        }
                    }
                    return array;
                },

                placeShips: function (locCell) {
                    let locationCell = document.getElementById(locCell);
                    let ship = locationCell.childNodes[0];
                    //            console.log(ship);
                    let loop; //the largest ship has 5 cells - 4 loops 
                    let type;
                    let locationArray = [];
                    //            console.log(ship.id == 'destroyer')
                    if (ship.id == 'carrier') {
                        loop = Float64Array;
                        type = 'carrier'
                    }
                    if (ship.id == 'battleship') {
                        loop = 3;
                        type = "battleship"
                    }
                    if (ship.id == 'cruiser') {
                        loop = 2;
                        type = "battleship"
                    }
                    if (ship.id == 'submarine') {
                        loop = 2;
                        type = "submarine"
                    } else if (ship.id == 'destroyer') {
                        loop = 1
                        type = "destroyer"
                    }

                    //------> GET LOCATION OF THIS SHIP--->
                    //get the letter corresponding to the id of the cell with the ship
                    let letter = locationCell.id.charAt(1);
                    //get the number corresponding to the id of the cell location of the ship and transform into a number with parseFloat - it parses the string until it reaches the end of that number
                    let numberId = locationCell.id;
                    //checks to see if the number location has one or two digits (10) and returns the only one with an integer value;
                    let checkNumber = numberId.substr(numberId.length - 2);
                    //            console.log(checkNumber);
                    let number;
                    if (Number.isInteger(checkNumber.charAt(0))) {
                        number = checkNumber;
                    } else {
                        number = checkNumber.charAt(1)
                    }

                    console.log("location letter is " + letter + " and " + "location number is " + number);
                    //add the location into the array
                    locationArray.push(letter + number);

                    for (let i = 0; i < loop; i++) {
                        console.log(locationArray);
                        if (ship.classList.contains('vertical')) {

                            letter = this.rows[this.rows.indexOf(letter) + 1];
                            locationArray.push(letter + number);
                            console.log(locationArray);

                        } else {
                            number++
                            locationArray.push(letter + number);
                        }

                    }
                    let newShip = {
                        type: type,
                        location: locationArray,
                    }
                    app.battleships.push(newShip);

                    for (let i = 0; i < this.shipsA.length; i++) {
                        if (this.shipsA[i] == newShip.type) {
                            var index = this.shipsA.indexOf(this.shipsA[i]);
                            if (index > -1) {
                                this.shipsA.splice(index, 1);
                            }
                        }
                    }
                    this.shipsA.push(newShip);
                    this.rules(this.shipsA);
                },

                displaySalvoes: function (array, table) {
                    let salvoes = array;
                    for (var i = 0; i < salvoes.length; i++) {
                        let turn = salvoes[i].turn;
                        let locations = salvoes[i].locations;
                        for (let j = 0; j < locations.length; j++) {
                            let salvoLocation = locations[j];
                            let cell = document.getElementById(table + salvoLocation);
                            cell.innerHTML = turn;
                            cell.classList.add("salvo-location");
                            if (cell.classList.contains("ship-location")) {
                                cell.classList.add("hit");
                            }
                        }
                    }

                },
                getUsername: function () {
                    let gamePlayers = this.gameView.game.gamePlayers;
                    let player1 = gamePlayers["0"].player.email;
                    let player2;
                    if (gamePlayers[1]) {
                        player2 = gamePlayers[1].player.email;
                    } else {
                        player1 = gamePlayers["0"].player.email;
                        player2 = '';
                    }
                    app.players = {
                        player1: player1,
                        player2: player2
                    }
                }
            },

            printShips: function (array, letter) {
                let ships = array;
                let shipsToPrint = [];
                for (let i = 0; i < ships.length; i++) {
                    let location = ships[i].location;
                    let type = ships[i].type.toLocaleLowerCase();
                    let direction = this.detectShipDirection(location);
                    for (let j = 0; j < location.length; j++) {
                        let shipLocation = location[j];
                        let shipCell = document.getElementById(letter + shipLocation);
                        shipCell.classList.add("ship-location");
                        shipCell.classList.add(type + "-" + j + "-" + direction);
                        shipCell.setAttribute("data-type", type);
                    }
                }
            },
            detectShipDirection: function (array) {
                let direction;
                if (array[0].charAt(0) == array[1].charAt(0)) {
                    direction = "hor"
                } else {
                    direction = "ver"
                }
                return direction;
            },
            selectCell: function (cellId) {
                let selectedCell = document.getElementById(cellId);
                if (!selectedCell.classList.contains("ship-location")) {
                    this.placeShipInTheGrid(cellId);
                    this.removeOldShip();
                    this.printShips(this.shipsToPlace, "P");
                }
            },
            removeOldShip: function () {
                let selectedShip = this.selectedShip.id;
                let oldShip = document.querySelectorAll("[data-type='" + selectedShip + "']")
                for (let i = 0; i < oldShip.length; i++) {
                    oldShip[i].setAttribute("class", "none-border-cell");
                }
            }
})
            //drag and drop 
            let ships = document.querySelectorAll('.shipTypeLabel');
            let cells = document.querySelectorAll('.userCells');
            let existingShips = document.querySelectorAll('.ship-location');
            var id;

            function allowDrop(ev) {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';
            }

            function startDrag(ev) {
                id = ev.target.id;
                console.log(id);
            }

            function drop(ev) {
                let locShip = ev.target.id;
                console.log(locShip); //location where the ship was dropped
                ev.target.append(document.getElementById(id));
                app.placeShips(ev.target.id);


                //    //check to see if the ship dropped contains the class shipTypeLabel
                //    if (ev.target.classList.contains('shipTypeLabel')){
                //        //if it does, remove it
                //        ev.target.classList.remove('shipTypeLabel');
                //        //add another class to identify it from now on as the location placed on the grid
                //        ev.target.classList.add('locationSet');
                //    }
            }
            //location of the ships ;



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
