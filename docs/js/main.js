const s=document.querySelector(".js_coctails"),d=document.querySelector(".js_search"),g=document.querySelector(".js-btn-search"),m="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=",f=document.querySelector(".js_reset"),a=document.querySelector(".js_coctails_favorite");let i=[],o=[];function v(){s.innerHTML="",u(d.value)}g.addEventListener("click",v);function h(){d.value="",s.innerHTML=""}f.addEventListener("click",h);const u=t=>{fetch(m+t).then(e=>e.json()).then(e=>{i=e.drinks,i===null?alert("No se han encontrado resultados"):S(),console.log(e)})};u("margarita");const k=t=>{let e=t.strDrinkThumb;return e===null&&(e="https://media.glamour.mx/photos/632371dd8645b8d42bd2a706/master/pass/cocteles-para-el-15-de-septiembre.jpg"),`<li class="card js_coctails_li" id="${t.idDrink}"> 
        <h6>${t.strDrink}</h6>
        <img src="${e}"/>
    </li>`},S=()=>{for(let e=0;e<i.length;e++)s.innerHTML+=k(i[e]);const t=document.querySelectorAll(".js_coctails_li");for(let e=0;e<t.length;e++)t[e].addEventListener("click",_)},_=t=>{console.log(t.currentTarget.id);const e=t.currentTarget.id,c=i.find(n=>n.idDrink===e),r=o.findIndex(n=>n.idDrink===e);r===-1?o.push(c):o.splice(r,1),console.log(o),l(),localStorage.setItem("coctailsFavorite",JSON.stringify(o))},p=t=>`<li class="card fav_coctail js_coctails_li">
        <button class="btn_remove js_remove_fav" id="${t.idDrink}">Eliminar de favoritos</button>
        <h6>${t.strDrink}</h6>
        <img src="${t.strDrinkThumb}"/>
    </li>`;function l(){a.innerHTML="";for(let e=0;e<o.length;e++)a.innerHTML+=p(o[e]);const t=document.querySelectorAll(".js_remove_fav");for(let e=0;e<t.length;e++)t[e].addEventListener("click",L)}const L=t=>{console.log(t.currentTarget.id);const e=t.currentTarget.id,c=i.find(n=>n.idDrink===e),r=o.findIndex(n=>n.idDrink===e);r===-1?o.push(c):o.splice(r,1),console.log(o),l(),localStorage.setItem("coctailsFavorite",JSON.stringify(o))};function j(){const t=localStorage.getItem("coctailsFavorite");t!==null&&(o=JSON.parse(t),l())}j();
//# sourceMappingURL=main.js.map
