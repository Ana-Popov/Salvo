var ships= document.querySelectorAll('.shipTypeLabel');
var cells = document.querySelectorAll(".userCells")


ships.addEventListener('dragstart', dragStart);
ships.addEventListener('dragend', dragEnd);

function dragStart(){
    console.log('starts');
}

function dragEnd(){
    console.log('end');
}

function allDrop(event){
    event.preventDefault();
}
//vue js instance
allowDrop: function(event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        },

        startDrag: function(ev) {
            app.id = ev.target.id;
            let placedShip = document.getElementsByClassName(".shipTypeLabel")
            console.log(placedShip);
            console.log(existingShips);

        },

        drop: function(ev) {
            let locShip = ev.target.id;
            console.log(ships)
            ev.target.append(document.getElementById(id));

        },
            
            //end vue js
            
            
            placeShips: function(cellId){
        let ship = document.getElementsByClassName("shipTypeLabel")[0];
        let locationCell = document.getElementById(cellId);
        
        let loop;
        let type;
        let locationArray = [];
        
        if(ship.id == 'destroyer'){
            loop = 4;
            type= "destroyer";
        }
        
        let letter = locationCell.id.charAt(1);
        let number = parseFloat(locationCell.id.charAt(2));
        locationArray.push(letter+number)
        for(let i = 0; i < loop; i++){
            if(ship.classList.contains("shipTypeLabel")){
                number++;
                locationArray.push(letter + number)
            } else{
                letter = this.rows[this.rows.indexOf(letter) + 1];
                locationArray.push(letter + number);
            }
        }
        let newShip = {
            type: type,
            location: locationArray,
            
        }
        for (let i = 0; i < app.shipsToPlace.length; i++){
            if( this.shipsToPlace[i].type == newShip.type){
                var index = app.shipsToPlace.indexOf(this.shipsToPlace[i]);
                if(index > -1){
                    app.shipsToPlace.splice(index, 1);
                }
            }
        }
        this.shipsToPlace.push(newShip);

    },
    selectCell: function (cellId) {
            let selectedCell = document.getElementById(cellId);
            if (!selectedCell.classList.contains("shipTypeLabel")) {
               app.placeShips(cellId);
//                this.removeOldShip();
                app.displayShips(app.shipsToPlace, "U");
            }
        },
    shipSelected: function (ship) {
            app.removeSelectedClass();
            let selectedShip = document.getElementById(ship);
            app.selectedShip = selectedShip;
            if (!app.selectedShip.classList.contains("shipTypeLabel")) {
                app.selectedShip.classList.add("shipTypeLabel")
            } else {
                app.selectedShip.classList.remove("shipTypeLabel")
            }

        },
    removeSelectedClass: function () {
            document.getElementById("destroyer").classList.remove("shipTypeLabel");
            document.getElementById("cruiser").classList.remove("shipTypeLabel");
            document.getElementById("submarine").classList.remove("shipTypeLabel");
            document.getElementById("boat").classList.remove("shipTypeLabel");
        },