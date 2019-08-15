const baseURL = 'https://api.spacexdata.com/v2/rockets';

const searchForm = document.querySelector('form');
const spaceShips = document.querySelector('table');

searchForm.addEventListener('submit', fetchSpace);

function fetchSpace(event) {
    /*!!!!!!!!!!!!!!!!!!!!!!!!!!*/event.preventDefault(); //prevents the webpage from reloading
    fetch(baseURL) //returns a promise, which can either be accepted or rejected
        .then(result => {
            // console.log(result);
            return result.json(); //json-ifying result so we can read it
        })
        .then(json => {
            // console.log(json);
            displayRockets(json) //JavaScript Object Notation
        })
}   

function displayRockets(data){
    console.log('Results', data);

    let rockets = data.forEach(element => {
        // console.log(element);
        let rocket = document.createElement('tr');
        let rocketName = document.createElement('td');
        let rocketCost = document.createElement('td');

        rocketName.innerText = element.name;
        rocketCost.innerText = element.cost_per_launch;

        spaceShips.appendChild(rocket);
        rocket.appendChild(rocketName);
        rocket.appendChild(rocketCost);
    })
}