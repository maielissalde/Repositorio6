
let productos = [];

// recupero informacion del producto y la agrego al html
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            auto = resultObj.data;

            let autoNombreHTML = document.getElementById("autoNombre");
            let autoDescripcionHTML = document.getElementById("autoDescripcion");
            let autoVendidosHTML = document.getElementById("autoVendidos");
            let autoCategoriaHTML = document.getElementById("autoCategoria");
            let autoPrecioHTML = document.getElementById("autoPrecio");


            autoNombreHTML.innerHTML = auto.name;
            autoDescripcionHTML.innerHTML = auto.description;
            autoPrecioHTML.innerHTML = auto.cost + " " + auto.currency;
            autoVendidosHTML.innerHTML = auto.soldCount;
            autoCategoriaHTML.innerHTML = auto.category;

            //Muestro las imagenes en forma de galería
            showImagenes(auto.images);
            // Envio informacion de posiciones de los productos relacionados
            relacionados(auto.relatedProducts)
        }
    })
});

// agrego las imagenes en forma de galeria
function showImagenes(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
                </div>
            </div>
            `
            

        document.getElementById("autoImagenes").innerHTML = htmlContentToAppend;
    }
}



// recupero comentarios  del producto
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
    if (result.status === 'ok') {
        comentarios = result.data;

        showComents(comentarios)
    }
})

// Muestro comentarios
function showComents(array) {
    let htmlContent = "";


    for (let i = 0; i < array.length; i++) {

        htmlContent +=
            ` <div class="list-group">
                
                <div class="d-flex flex-row comment-row m-t-0">
                    <div class ="comment-text w-100>
                    <h6 class="font-weight-bold">${array[i].user}</h6>
                    <div>${`<span class="fa fa-star checked"></span>`.repeat(array[i].score) + `<span class="fa fa-star"></span>`.repeat(5 - array[i].score)}</div>
                    <span class="m-b-15 d-block">${array[i].description}</span>
                <div class="comment-footer">
                    <span class="text-muted float-right">${array[i].dateTime}</span>
                    </div>
                </div>
            </div>
            <br>
            `

        document.getElementById("comentarios").innerHTML = htmlContent
    }
}

// recupero lista de productos
getJSONData(PRODUCTS_URL).then(function (result) {
    if (result.status === 'ok') {
        productos = result.data;
    }
})


// muestro informacion de los relacionados
function relacionados(array) {
    let htmlContent = ""

    for (let i = 0; i < array.length; i++) {
        //tomo las posiciones 
        let posicion = array[i];
        let prodRelacionado = productos[posicion]

        // muestro el contenido
        htmlContent += `
    <div class="card" style="width: 18rem;">
    <img src="${prodRelacionado.imgSrc}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${prodRelacionado.name}</h5>
            <p class="card-text">${prodRelacionado.description}</p>
            <a href="#" class="btn btn-primary">ver</a>
        </div>
 </div>
 `
    }

    document.getElementById('autosRelacionadosContainer').innerHTML = htmlContent;
}