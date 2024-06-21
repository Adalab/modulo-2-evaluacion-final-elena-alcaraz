//Otra forma de renderizar una bebida
const renderOneCoctail = (eachCoctail) => {
    let imgCoctail = eachCoctail.strDrinkThumb;
    if (imgCoctail === null) {
        imgCoctail = 'https://media.glamour.mx/photos/632371dd8645b8d42bd2a706/master/pass/cocteles-para-el-15-de-septiembre.jpg'
    }
    return `<li class="card js_coctails_li" id="${eachCoctail.idDrink}"> 
        <h6>${eachCoctail.strDrink}</h6>
        <p class="card_ingredients">${eachCoctail.strIngredient1}, ${eachCoctail.strIngredient2}, ${eachCoctail.strIngredient3}</p>
        <img src="${imgCoctail}"/>
        </li>`
};

//Renderizar todas las bebidas con la segunda opción
const renderAllCoctails = () => {
    //pintamos los cócteles
    ulList.innerHTML = "" ; 
    for (let i = 0; i < coctailsData.length; i++) {
        ulList.innerHTML += renderOneCoctail(coctailsData[i])
    }
    //asignamos el evento click a cada uno de los cócteles
    const allCoctailsLi = document.querySelectorAll('.js_coctails_li');
    for (let i = 0; i < allCoctailsLi.length; i++) {
        allCoctailsLi[i].addEventListener('click', addFavorite);
    }
};