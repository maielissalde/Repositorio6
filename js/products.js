const ascendente = "0aMax";
const descendente = "maxA0";
const relevancia = "rel";
var ordenados = [];
let criterio = [];
let min = undefined
let max = undefined

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(productos =>{
        if (productos.status === "ok")
        {sortProducts(ascendente, productos.data);}
    });
});

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

function filtro(){
    let filtrados = [];
    
    if (min === undefined && max === undefined) {
        filtrados = ordenados;
    } else {filtrados = ordenados.filter(product => 
        product.cost > min && product.cost < max)}

 showProductsList(filtrados)
}

function showProductsList(array){

    let html = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        html += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` productos vendidos</small>
                    </div>
                    <p>` + product.currency + ` ` + product.cost + `</p>
                    <p class= "mb-1"> ` + product.description +`</p>
                    <button type="button" class="btn btn-primary" onclick="window.location.href='product-info.html'">Ver más información</button>
                </div>
            </div>
        </a>
        `

        document.getElementById("lista").innerHTML = html;
    }
}

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

    if ((minP) >= 0){min = minP} 
    else {min = 0;}

    if ((maxP) >= 0){max = maxP} else {
    max = 400000;}

    sortProducts(criterio, lista);
});