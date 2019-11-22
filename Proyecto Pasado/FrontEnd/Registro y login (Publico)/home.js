"use strict"
//No id
//let url = "https://api.myjson.com/bins/dqo4m"

//With id 
let url = "https://api.myjson.com/bins/1cwzea"

var cart = {
    items: []
};

//limpiar localStorage
//localStorage.setItem('cart', JSON.stringify(cart));

if(localStorage.cart) {
    cart = JSON.parse(localStorage.cart);
}

let cbOk_1 = (data) => {
    console.log("Callback_OK")
    productos = data;
    console.log(productos);
    productListToHTML(productos);
    console.log(productos[0].cantidad)
}

function loadJSON(url, cbOk = callback_ok,cbErr) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    
    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', url);
    
    // 4. Enviar solicitud
    xhr.send();
    
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
    
    if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
    // Ocurrió un error
    alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
    cbErr(xhr.status + ': ' + xhr.statusText);

    // ejecutar algo si error
    } else {
    let datos = JSON.parse(xhr.response); //esta es la línea que hay que probar
    
    // Ejecutar algo si todo está correcto
    console.log("Exito"); // Significa que fue exitoso
    cbOk(datos);
    cbOk_1(datos);
    }
    };
}

let productos = [];

function initData(){
    loadJSON(url, 
        cbOk => {
            productos = cbOk;
            console.log(productos);
        },
        cbErr => {

        });
}
initData();

function productToHTML(productos){
    let sResultado =`<div class="column">
    <div class="card" style="width: 15rem;">
        <img src="${productos.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
                <h5 class="card-title">${productos.descripcion}</h5>
                <p class="card-text">Categoria: ${productos.categoria}</p>
                <p class="card-text">Stock: ${productos.cantidad}</p>
                <p class="card-text">Disponible: Ahora</p>

            <a href="#" class="btn btn-primary" onclick="agregarCarrito(${productos.id})">Agregar al carrito</a>
        </div>
    </div>
</div>`; 
    return sResultado;
}

/*
function productListToHTML (productos){
    let cartList;
    if (cart.items.length > 0) {
    cartList = cart.items.map( producto => {
         return productToHTML(producto)
         } )
    }
     console.table(productsList);
     let html = cartList.join("");
     carrito-tabla.innerHTML += "" + html;
 }

*/

function productListToHTML (productos){
    let productsList = 
    productos.map( producto => {
         return productToHTML(producto)
         } )
     console.table(productsList);
     let html = productsList.join("");
     listaProductos.innerHTML += "" + html;
 }


function agregarCarrito(id) {
    let index = cart.items.filter(function (item) { return item.id === id }).length;
    if (index === 0) {
        let producto = {
            imagen: productos[id].imagen,
            descripcion: productos[id].descripcion,
            categoria: productos[id].categoria,
            id: id,
            cantidad: 1
        }
        cart.items.push(producto); 
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Tu producto se ha añadido al carrito!");
   
    }else {
        alert("Este producto ya esta en tu carrito!");

    }

    
}

/*
let tdId = document.createElement('td');
let tdDescripcion = document.createElement('td');
let tdImagen = document.createElement('td');
let tdCategoria = document.createElement('td');
let tdCantidad = document.createElement('td');

let newRow = document.createElement('tr');

*/