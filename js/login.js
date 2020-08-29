document.addEventListener("submit", function(e){
const usuario = document.getElementById("email").value
    
console.log(usuario)

localStorage.setItem('usuario', usuario)
 })


