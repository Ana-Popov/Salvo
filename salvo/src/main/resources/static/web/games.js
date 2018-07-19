
document.addEventListener("DOMContentLoaded", function () {

    const url = 'http://localhost:8080/api/games';
    fetch(url)
        .then((resp) => resp.json()) //transform data into json 
        .then(function (data) {
            //code here

        })
        .catch(function (error) {
            console.log('failed to load, try again', error);
        });
})

//function creates a type of element passed in the parameter
function createNode(element){
    return document.createElement(element);
}
//append the second el to its parent on the DOM 
function append(parent, el){
    return parent.appendChild(el);
}