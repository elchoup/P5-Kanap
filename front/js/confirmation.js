// Recupération de l'id dans l'URL de la page
let params = new URL(window.location.href).searchParams;
let id = params.get('id');
let numero = document.getElementById('orderId');
numero.innerHTML = id;