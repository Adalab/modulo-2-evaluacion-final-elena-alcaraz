'use strict';

//variables globales
const ulList = document.querySelector('.js_coctails');
const inputSearch = document.querySelector('.js_search');
const buttonSearch = document.querySelector('.js-btn-search');
const SERVER_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;
const buttonReset = document.querySelector('.js_reset');

let coctailsData = []


//RENDERIZAR LAS BEBIDAS
const renderOneCoctail = (eachCoctail) => {
    return `<li class= "card"> 
        <h6>${eachCoctail.strDrink}</h6>
        <img src="${eachCoctail.strDrinkThumb}"/>
    </li>`
    //¿meter aquí condicional para las bebidas que no tengan foto? 
};

const renderAllCoctails = () => {
    for (let i = 0; i < coctailsData.length; i++) {
        ulList.innerHTML += renderOneCoctail(coctailsData[i])
    }
};


// FETCH A LA API
const getData = () => {
    fetch(SERVER_URL + inputSearch.value)
        .then(response => response.json())
        .then(dataApi => {
            coctailsData = dataApi.drinks;
            console.log(dataApi)
            renderAllCoctails();
        })
};

//BUSCAR
function search () {
    console.log(inputSearch.value);
    ulList.innerHTML = '';
    getData();
};

buttonSearch.addEventListener('click', search);

//RESETEAR
function reset () {
    inputSearch.value = '';
    ulList.innerHTML = '';
};

buttonReset.addEventListener('click', reset);


//getData(); >> esto me hace que la página empiece siendo en blanco, preguntar a Dayana
//