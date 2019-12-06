"use strict"
//12 obj
let url = "https://api.myjson.com/bins/1d05le";

let url2 = "http://localhost:3000/api/products"

var cart = {
    items: []
};

let idProducto = {
    _id: ""
}


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
    console.log(productos[0].cantidad);
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

function loadJSON(url, cbOk = callback_ok, cbErr) {

    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', url);
    console.log(url);
    let userTOKEN = JSON.parse(localStorage.userToken);
    console.log(userTOKEN.token);
    console.log(localStorage.userToken);
    //xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.setRequestHeader("x-auth-user", userTOKEN.token);

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
    console.log(productos._id);
    let sResultado = `<div class="column">
    <div class="card" style="width: 15rem;">
        <img src="${productos.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
                <h5 class="card-title">${productos.descripcion}</h5>
                <p class="card-text">Categoria: ${productos.categoria}</p>
                <p class="card-text">Stock: ${productos.stock}</p>
                <p class="card-text">Disponible: Ahora</p>

            <a href="#" class="btn btn-primary" onclick="agregarCarrito('${productos._id}')">Agregar al carrito</a>
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
   
    /*let index = cart.items.filter(function (item) {
        console.log("llegue carrito: " + id + " " + item.id);
        return item._id === id
    }).length;
*/

idProducto._id = id;

productosInfoHTTP(idProducto, 'http://localhost:3000/api/productos/info', JSON.parse(localStorage.userToken).token, function (cb1) {
    let productosI = cb1[0];
    console.log(productosI.imagen);
    let producto = {
        imagen: productosI.imagen,
        descripcion: productosI.descripcion,
        categoria: productosI.categoria,
        cantidad: 1,
        stock: productosI.stock
    }

    console.log(producto);
    cart.items.push(producto);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Tu producto se ha añadido al carrito!");

    }, function (cb2) {
        alert('tum maama ');
    });
    //if (index === 0) {
        

    //} else {
       // alert("Este producto ya esta en tu carrito!");

    //}


}

///////////////////////////HTTP////////////////////////////

//Esta funcion manda correo y contraseña, verifica si el usuario existe o la contraseña es corecta.
function productosInfoHTTP(datos, url, token, cbOk, cbErr) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('POST', url);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log( " TOKEN ", JSON.parse(localStorage.userToken).token);
    xhr.setRequestHeader('x-auth-user', token);
    
    // 4. Enviar solicitud al servidor
    xhr.send(JSON.stringify(datos));
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.status != 200 && xhr.status != 201) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            cbErr(xhr.status + ': ' + xhr.statusText);
        } else {
        
                let datos = JSON.parse(xhr.responseText);
                console.log(datos); // Significa que fue exitoso
                cbOk(datos);
           

        }
    };
}
//-------------------------------------------------------------------------------------



