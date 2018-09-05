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