'use strict';


//variables globales
const ulList = document.querySelector('.js_coctails');
const inputSearch = document.querySelector('.js_search');
const buttonSearch = document.querySelector('.js-btn-search');
const SERVER_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;
const buttonReset = document.querySelector('.js_reset');
const favList = document.querySelector('.js_coctails_favorite');


let coctailsData = []
let coctailsFavorite = [];

//BUSCAR
function search () {
    ulList.innerHTML = '';
    if (inputSearch.value === '') {
        alert('Introduce un coctail para poder buscar :)')
        getData("margarita");
    } else {
        getData(inputSearch.value);
    }
};

buttonSearch.addEventListener('click', search);

//RESETEAR
function reset () {
    inputSearch.value = '';
    ulList.innerHTML = '';
};

buttonReset.addEventListener('click', reset);


// FETCH A LA API
const getData = (value) => {
    fetch(SERVER_URL + value)
        .then(response => response.json())
        .then(dataApi => {
            coctailsData = dataApi.drinks;
            if (coctailsData === null) {
                alert('No se han encontrado resultados')
            } else {
                renderAllCoctails();
            }
            console.log(dataApi)
        })
};

getData("margarita");

//RENDERIZAR UNA BEBIDA
const renderOneCoctail = (eachCoctail) => {
    let imgCoctail = eachCoctail.strDrinkThumb;
    if (imgCoctail === null) {
        imgCoctail = 'https://media.glamour.mx/photos/632371dd8645b8d42bd2a706/master/pass/cocteles-para-el-15-de-septiembre.jpg'
    }
    //convertir en operador ternario lo de arriba?
    
    return `<li class="card js_coctails_li" id="${eachCoctail.idDrink}"> 
        <h6>${eachCoctail.strDrink}</h6>
        <img src="${imgCoctail}"/>
        </li>`
};

//RENDERIZAR TODAS LAS BEBIDAS
const renderAllCoctails = () => {
    //pintamos los cócteles
    for (let i = 0; i < coctailsData.length; i++) {
        ulList.innerHTML += renderOneCoctail(coctailsData[i])
    }

    //asignamos el evento click a cada uno de los cócteles
    const allCoctailsLi = document.querySelectorAll('.js_coctails_li');
    for (let i = 0; i < allCoctailsLi.length; i++) {
        allCoctailsLi[i].addEventListener('click', addFavorite);

    }

};

///añadir favorito
const addFavorite = (ev) => {
    const idCoctail = ev.currentTarget.id;
    //obtenemos todos los datos del coctail clicado. 
    const clickedCoctail = coctailsData.find(item => item.idDrink === idCoctail);

    //verificar si la paleta cliada ya es un fav
    const isFavoriteCoctailIndex = coctailsFavorite.findIndex(item => item.idDrink === idCoctail);
    //condicional para añadir al array si no está, y quitarla si clicamos de nuevo
    if (isFavoriteCoctailIndex === -1) {
        //añadimos el coctail si no está
        coctailsFavorite.push(clickedCoctail);
        ev.currentTarget.classList.add('blue');
    } else {
        //si está, lo quitamos de favoritos
        coctailsFavorite.splice(isFavoriteCoctailIndex, 1);
        ev.currentTarget.classList.remove('blue');
    };
    
    //añadir la clase a los que se clican para favoritos
    //ev.currentTarget.classList.toggle('blue');
    renderFavorites();

    //guardar favoritos en el local storage
    localStorage.setItem('coctailsFavorite', JSON.stringify(coctailsFavorite)); 
};

//Renderizar un favorito
const renderOneFavoriteCoctail = (eachCoctail) => {
    return `<li class="card fav_coctail js_coctails_li">
        <button class="btn_remove js_remove_fav" id="${eachCoctail.idDrink}">Eliminar de favoritos</button>
        <h6>${eachCoctail.strDrink}</h6>
        <img src="${eachCoctail.strDrinkThumb}"/>
    </li>`
};

//renderizar todos los favoritos + evento sobre el botón eliminar
function renderFavorites () {
    favList.innerHTML = '';
    for (let i = 0; i < coctailsFavorite.length; i++) {
        favList.innerHTML += renderOneFavoriteCoctail (coctailsFavorite[i])
    }

    const allBtnFav = document.querySelectorAll('.js_remove_fav');
    for (let i = 0; i < allBtnFav.length; i++) {
        allBtnFav[i].addEventListener('click', removeFavorite);
    }
};

const removeFavorite = (ev) => {
    const idCoctail = ev.currentTarget.id;
    //obtenemos todos los datos del botón de eliminar clicado. 
    const clickedCoctail = coctailsData.find(item => item.idDrink === idCoctail);

    //verificar si el coctail cliada ya es un fav
    const isFavoriteCoctailIndex = coctailsFavorite.findIndex(item => item.idDrink === idCoctail);
    //condicional para añadir al array si no está, y quitarla si clicamos de nuevo
    if (isFavoriteCoctailIndex === -1) {
        //añadimos el coctail si no está
        coctailsFavorite.push(clickedCoctail);
    } else {
        //si está, lo quitamos de favoritos
        coctailsFavorite.splice(isFavoriteCoctailIndex, 1);
    };

    renderFavorites();
    
    //sobreescribimos el local storage 
    localStorage.setItem('coctailsFavorite', JSON.stringify(coctailsFavorite)); 
};

//renderizamos lo que tenemos en el localStorage
function renderLocalStorage () {
    const localStorageData = localStorage.getItem('coctailsFavorite');
    if (localStorageData !== null) {
        coctailsFavorite = JSON.parse(localStorageData);
        renderFavorites();
    }
};

renderLocalStorage();
