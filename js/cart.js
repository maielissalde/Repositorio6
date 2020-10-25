const CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json"

let arrayArticulos = [];
let subtotalFinal = 0;
let subtotal = 0;



// Recupero información
document.addEventListener("DOMContentLoaded", function (e) {
    fetch(CARRITO).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(response => {
        arrayArticulos = response.articles;
        mostrarCarrito(arrayArticulos)
    })


});

// Muestro la información en el HTML
function mostrarCarrito(articles) {
    let content = '';

    for (let i = 0; i < articles.length; i++) {
        content += ` 
     <tr>
            <td><img src='`+ articles[i].src + `' width="50px"></td>
            <td>`+ articles[i].name + `</td>
            <td>`+ articles[i].currency + " " + articles[i].unitCost + `</td>
            <td><input class="form-control countArticle" style="width:60px;" type="number" id="productCount-${i}" value="` + articles[i].count + `" min="1"></td>
            <td><span id="productSubtotal-${i}" style="font-weight:bold;">${articles[i].currency} ${articles[i].unitCost * articles[i].count}</span></td>
        </tr>
        `
        document.getElementById('cart-products').innerHTML = content;
    }
    modificarCantidad()
}

// modifica el precio segun la cantidad de forma dinamica 
function modificarCantidad() {
    let subTotal = document.getElementsByClassName("countArticle");
    actualizarSubTotal(); // calculo los costos finales
    for (let i = 0; i < subTotal.length; i++) {
        subTotal[i].addEventListener("change", function () {
            document.getElementById("productSubtotal-" + i).innerHTML = arrayArticulos[i].currency + " " + subTotal[i].value * arrayArticulos[i].unitCost
            actualizarSubTotal() // actualizo los costos finales
        })
    }
}

// Calculo e imprimo los costos finales
function actualizarSubTotal() {
    subtotal = 0;
    let array = document.getElementsByClassName("countArticle")
    for (let i = 0; i < arrayArticulos.length; i++) {
        subtotal += calculoSubProdu(array[i].value, i) // envio a funcion para calcular el subtotal
    }
    document.getElementById("subtotal").innerHTML = "UYU " + subtotal;


}



// calculo el subtotal del producto en pesos uruguayos y devuelvo el numero
function calculoSubProdu(count, index) {
    let sub = 0;
    if (arrayArticulos[index].currency === "USD") {
        sub = arrayArticulos[index].unitCost * count * 40;
    } else {
        sub = arrayArticulos[index].unitCost * count;
    }
    return sub
}

// se calcula el total en funcion del envio seleccionado
function actualizarTotal() {
    actualizarSubTotal()
    var hola = "";
    var envio = document.forms[0];
    for (let i = 0; i < envio.length; i++) {
        if (envio[i].checked) {
            hola = subtotal * envio[i].value / 100
            subtotalFinal = subtotal + hola
            document.getElementById("total").innerHTML = "UYU " + subtotalFinal;
        }
    }
}



// funcion que verifica si los campos estan completos correctamente. Es llamada a traves del boton submit
function validacion() {

    if (document.getElementById("TarjetaC").checked || document.getElementById("TarjetaD").checked) {

        valor1 = document.getElementById("T1").value;
        valor2 = document.getElementById("T2").value;
        valor3 = document.getElementById("T3").value;
        valor4 = document.getElementById("T4").value;
        if (valor1 == null || valor1.length == 0 || /^\s+$/.test(valor1)) {
            alert("Debe completar el nombre del titular")
            return false;
        }

        else if (valor2 == null || valor2.length == 0 || /^\s+$/.test(valor2)) {
            alert("Debe completar el numero de tarjeta")
            return false;
        }

        else if (valor3 == null || valor3.length == 0 || /^\s+$/.test(valor3)) {
            alert("Debe completar fecha de vencimiento")
            return false;
        }

        else if (valor4 == null || valor4.length == 0 || /^\s+$/.test(valor4)) {
            alert("Debe completar codigo de seguridad")
            return false;
        }
    }


    return true;

}

// Comprueba que se haya seleccionado un metodo de pago para realizar la compra
function ultimaVeri() {
    if (document.getElementById("gridRadios1").checked || document.getElementById("gridRadios2").checked || document.getElementById("gridRadios3").checked) {
        alert("Su compra ha sido realizada con éxito")
    }
    else {
        alert("Seleccione método de envío")
    }
}

//Queda para una proxima vez
// function habilitar() {

//     let botones = document.getElementsByClassName("custom-control custom-radio");

//     botones.addEventListener("change", function () {
//         console.log("hola")
//     if (document.getElementById("Efectivo").checked) {
//         document.getElementById("T1").disabled = true
//     }
//     else {
//         document.getElementById("T1").disabled = false
//     }
// })
// }