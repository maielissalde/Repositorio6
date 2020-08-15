document.addEventListener("submit", function(e){
const usuario = document.getElementById("email").value
    
console.log(usuario)

sessionStorage.setItem('usuario', usuario)
 })

localStorage.clear();
