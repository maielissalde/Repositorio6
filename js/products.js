const ascendente = "0aMax";
const descendente = "maxA0";
const relevancia = "rel";
let lista = []
var ordenados = [];
let criterio = [];
let min = undefined
let max = undefined

// trae el array con la información y la envía a ordenar de forma ascendente
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(productos =>{
        if (productos.status === "ok")
        { lista = productos.data
        sortProducts(ascendente, lista);
        }
    });
});

// Ordena el array según costo y cantidad de vendidos y envía a filtrar
function sortProducts(criterio, array){
     if (criterio === ascendente){
        ordenados = array.sort((a, b) => {
        return a.cost - b.cost
    })} else if (criterio === descendente){
        ordenados = array.sort((a, b) => {
            return b.cost - a.cost
    })} else if (criterio === relevancia){
        ordenados = array.sort((a, b) => {
            return b.soldCount - a.soldCount
        })}

    filtro(ordenados)
}

// Filtra según precio y envía a mostrar en HTML
function filtro(){
    let filtrados = [];
    
    if (min === undefined && max === undefined) {
        filtrados = ordenados;
    } else {filtrados = ordenados.filter(product => 
        product.cost > min && product.cost < max)}

 showProductsList(filtrados)
}

// Muestra la información en el HTML
function showProductsList(array){

    let html = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        html += `
        <div class="col-4">
        <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
            <img class="bd-placeholder-img card-img-top" src="${product.imgSrc}">
             <h3 class="m-3">${product.name} </h3>
            <div class="card-body">
            <p class="card-text">${product.description}</p>
            </div>
            <h4 class="m-3 text-right">${product.currency + " " + product.cost}</h4>
            <h5 class="m-3 text-right text-muted">${product.soldCount} Unidades vendidas</h5>
        </a>
        </div>
        `

        document.getElementById("lista").innerHTML = html;
    }
}

// Según dónde se hace click determinan un criterio y llaman a función de ordenar
document.getElementById("ordAsc").addEventListener("click", function(){
    criterio = ascendente
    sortProducts(criterio, lista);
});

document.getElementById("ordDesc").addEventListener("click", function(){
    criterio = descendente
    sortProducts(criterio, lista);
});

document.getElementById("ordByCount").addEventListener("click", function(){
    criterio = relevancia
    sortProducts(criterio, lista);
});

document.getElementById("clearFilter").addEventListener("click", function(){
    min = undefined
    max = undefined
    sortProducts(ascendente, lista)
});

document.getElementById("filterCount").addEventListener("click", function(){

minP = document.getElementById("countMin").value;
maxP = document.getElementById("countMax").value;

if ((minP) >= 0){
    min = minP
} else {
    min = 0;
}

if ((maxP) >= 0){
    max = maxP
} else {
    max = 400000;
}

sortProducts(criterio, lista);
});

