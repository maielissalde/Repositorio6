const CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json"

let arrayArticulos = [];
let subtotalFinal = 0;


// Recupero información
document.addEventListener("DOMContentLoaded", function(e){
    fetch(CARRITO).then (response => {
        if(response.ok){return response.json();
        }
    }) .then(response => {
        arrayArticulos = response.articles;
        mostrarCarrito(arrayArticulos)
    })
    
});


// Muestro la información en el HTML

function mostrarCarrito(articles){
    let content = '';
 
    for(let i = 0; i < articles.length; i++){
     content += ` 
     <tr>
            <td><img src='`+ articles[i].src + `' width="50px"></td>
            <td>`+ articles[i].name + `</td>
            <td>`+ articles[i].currency + " " + articles[i].unitCost +`</td>
            <td><input class="form-control countArticle" style="width:60px;" type="number" id="productCount-${i}" value="`+ articles[i].count + `" min="1"></td>
            <td><span id="productSubtotal-${i}" style="font-weight:bold;">${articles[i].currency} ${articles[i].unitCost * articles[i].count}</span></td>
        </tr>
        `
     document.getElementById('cart-products').innerHTML=content;
    }   
    modificarCantidad()
}

// modifica el precio segun la cantidad de forma dinamica 
function modificarCantidad(){
    let subTotal = document.getElementsByClassName("countArticle");
    actualizarSubTotal(); // calculo los costos finales
    for(let i=0;i<subTotal.length;i++){
        subTotal[i].addEventListener("change",function(){
            document.getElementById("productSubtotal-"+i).innerHTML= arrayArticulos[i].currency + " " + subTotal[i].value * arrayArticulos[i].unitCost
            actualizarSubTotal() // actualizo los costos finales
        })
    }
}

// Calculo e imprimo los costos finales
function actualizarSubTotal(){
    let subtotal = 0;
    let array = document.getElementsByClassName("countArticle")
    for (let i=0; i < arrayArticulos.length; i++){
        subtotal += calculoSubProdu(array[i].value, i) // envio a funcion para calcular el subtotal
    }
    document.getElementById("subtotal").innerHTML = "UYU " + subtotal;
    subtotalFinal=subtotal;
    document.getElementById("total").innerHTML = "UYU " + subtotalFinal
    
}



// calculo el subtotal del producto en pesos uruguayos y devuelvo el numero
function calculoSubProdu(count,index){
    let sub=0;
    if(arrayArticulos[index].currency==="USD"){
        sub = arrayArticulos[index].unitCost * count * 40;
    } else {
        sub = arrayArticulos[index].unitCost*count;
    }
    return sub
}
