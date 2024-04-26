'use strict';

//variables globales
const ulList = document.querySelector('.js_coctails');

let coctailsData = []

const renderOneCoctail = (eachCoctail) => {
    return `<li> 
        <h6>${eachCoctail.strDrink}</h6>
        <img src="${eachCoctail.strDrinkThumb}"/>
    </li>`
};

const renderAllCoctails = () => {
    for (let i = 0; i < coctailsData.length; i++) {
        ulList.innerHTML += renderOneCoctail(coctailsData[i])
    }
};

const getData = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        .then(response => response.json())
        .then(dataApi => {
            coctailsData = dataApi.drinks;
            console.log(dataApi)
            renderAllCoctails();
        })
};



//se ejecuta cuando carga la página
getData(); 