// funcion que corrobora que los datos introducidos sean correctos y si lo son, llama a funcion guardar
function corroborar() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = document.getElementById("edad").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;

    if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
        alert("Debe completar el nombre")
        return false;
    }

    else if (apellido == null || apellido.length == 0 || /^\s+$/.test(apellido)) {
        alert("Debe completar el apellido")
        return false;
    }

    else if (telefono.length < 9 || /^\s+$/.test(telefono)) {
        alert("Debe ingresar un número de teléfono válido")
        return false;
    }

    else if (edad == null||edad < 16 || /^\s+$/.test(edad)) {
        alert("Debe ser mayor de 16 para tener una cuenta")
        return false;
    }

    else if (!/\S+@\S+\.\S+/.test(correo)) {
        alert("Debe introducir un correo valido")
        return false;
    }
    

    guardarDatos()
}


// función que accede a los valores de los inputs y crea objeto para guardarlo. Luego pasa a string y guarda en local Storage
function guardarDatos() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = document.getElementById("edad").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;


    let objeto = {
        nombreObj: nombre,
        apellidoObj: apellido,
        edadObj: edad,
        telefonoObj: telefono,
        correoObj: correo,
    }

    let objetoString = JSON.stringify(objeto);
    localStorage.setItem("objetoUsuario", objetoString);

}


// tomo los datos del localStore y los muestro dentro de los inputs
document.addEventListener("DOMContentLoaded", function (e) {
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let edad = document.getElementById("edad");
    let telefono = document.getElementById("telefono");
    let correo = document.getElementById("correo");
    

    let objetoFinal = JSON.parse(localStorage.getItem("objetoUsuario"));


    nombre.value = objetoFinal.nombreObj
    apellido.value = objetoFinal.apellidoObj
    edad.value = objetoFinal.edadObj
    telefono.value = objetoFinal.telefonoObj
    correo.value = objetoFinal.correoObj

})