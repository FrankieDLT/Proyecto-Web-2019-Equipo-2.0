"use strict"
//12 obj
let url = "https://api.myjson.com/bins/1d05le";

let url2 = "http://localhost:3000/api/products"

var cart = {
    items: []
};


//limpiar localStorage
//localStorage.setItem('cart', JSON.stringify(cart));

if (localStorage.cart) {
    cart = JSON.parse(localStorage.cart);
}

let cbOk_1 = (data) => {
    console.log("Callback_OK");
    productos = data;

    console.log("productos", productos);
    productListToHTML(productos);
    console.log(productos[0].cantidad)
};

function httpRequest(address, reqType, asyncProc) {
    var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    if (asyncProc) {
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                asyncProc(this);
            }
        };
    } else {
        req.timeout = 4000;  // Reduce default 2mn-like timeout to 4 s if synchronous
    }
    req.open(reqType, address, !(!asyncProc));
    req.send();
    return req;
}

/*$.ajax({
    url: url2,
    type: 'GET',
    //accepts: "application/json",
    //beforeSend: function(xhr){xhr.setRequestHeader('x-auth-user', 'hIGn7uEuPb-5de6deff9694c431845c908e');},
    headers: {
        'Access-Control-Allow-Origin': '*',
        'x-auth-user':JSON.parse(localStorage.userToken),
    },
    dataType:JSON,
    success: function(result){ 
        console.log("resultado:",result)
    },
    error: function(error) {
        console.log("error ", error)
    }
})*/


function loadJSON(url, cbOk = callback_ok, cbErr) {

    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', url);
    console.log(url);
    let cualquierMamada = JSON.parse(localStorage.userToken);
    console.log(cualquierMamada.token);
    console.log(localStorage.userToken);
    //xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.setRequestHeader("x-auth-user", cualquierMamada.token);

    console.log('Por llamar');
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

function initData() {

    loadJSON(url2,
        cbOk => {
            productos = cbOk;
            console.log(productos);
        },
        cbErr => {

        });
}

initData();

function productToHTML(productos) {
    let sResultado = `<div class="column">
    <div class="card" style="width: 15rem;">
        <img src="${productos.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
                <h5 class="card-title">${productos.descripcion}</h5>
                <p class="card-text">Categoria: ${productos.categoria}</p>
                <p class="card-text">Stock: ${productos.stock}</p>
                <p class="card-text">Disponible: Ahora</p>

            <a href="#" class="btn btn-primary" onclick="agregarCarrito(${productos.id})">Agregar al carrito</a>
        </div>
    </div>
</div>`;
    return sResultado;
}


function productListToHTML(productos) {
    let productsList =
        productos.map(producto => {
            return productToHTML(producto)
        })
    console.table(productsList);
    let html = productsList.join("");

    listaProductos.innerHTML += "" + html;
}

//listaProductos = listaProductos.slice(0,5)


function agregarCarrito(id) {
    let index = cart.items.filter(function (item) {
        return item.id === id
    }).length;
    if (index === 0) {
        let producto = {
            imagen: productos[id].imagen,
            descripcion: productos[id].descripcion,
            categoria: productos[id].categoria,
            id: id,
            cantidad: 1,
            stock: productos[id].stock
        }
        cart.items.push(producto);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Tu producto se ha añadido al carrito!");

    } else {
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