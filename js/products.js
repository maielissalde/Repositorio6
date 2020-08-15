function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>
                        <small class="text-muted">` + category.soldCount + ` productos vendidos</small>
                    </div>
                    <p>` + category.currency + ` ` + category.cost + `</p>
                    <p class= "mb-1"> ` + category.description +`</p>
                    <button type="button" class="btn btn-primary" onclick="window.location.href='product-info.html'">Ver más información</button>
                </div>
            </div>
        </div>
        `

        document.getElementById("lista").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(productos =>{
        if (productos.status === "ok")
        {
        showProductsList(productos.data);
        }
    });
});
