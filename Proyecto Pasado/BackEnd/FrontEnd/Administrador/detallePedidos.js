var cart;

let usuarioInfo;

let productoList = {
    usuario: "",
    items: []
}

let usuario = {
    correo: ""
}

let carritoFind = {
    usuario: ""
}

let pedido = {
    correo: "",
    fecha: "",
    fechaEntrega: "",
    status: "",
    items: []
}


//--------------------HTTP Carrito--------------------------------------
function modificarPedido(datos, url, cbOk, cbErr) {
    console.log("LLegue a guardar carrito")

    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('PUT', url);
    console.log(url);
    let userTOKEN = JSON.parse(localStorage.userToken);
    console.log(userTOKEN.token);
    //xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("x-auth-user", userTOKEN.token);
    // 4. Enviar solicitud
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

//Esta funcion manda correo, verifica si el usuario existe o la contraseña es corecta.
function usersInfoHTTP(datos, cbOk, cbErr) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('POST', 'http://localhost:3000/api/users/info');
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
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

//Esta funcion manda usuario, descarga el carrito del usuario.
function pedidoInfoHTTP(datos, url, cbOk, cbErr) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('POST', url);
    let userTOKEN = JSON.parse(localStorage.userToken);
    console.log(userTOKEN.token);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("x-auth-user", userTOKEN.token);
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
            cbOk(datos);


        }
    };
}

console.log(localStorage.pedidoDetalle);

usuario.correo = localStorage.pedidoDetalle;
console.log(usuario);

usersInfoHTTP(usuario, function (cb1) {
    usuarioInfo = cb1;
    carritoFind.usuario = usuarioInfo._id;
    console.log(carritoFind);
    console.log(usuario);

    pedidoInfoHTTP(usuario, 'http://localhost:3000/api/pedidos/info', function (cb1) {
        cart = cb1[0];
        console.log(cart);
        productListToHTML()
    }, function (cb2) {
        alert("no cargo el pedido " + cb2);
    });

}, function (cb2) {
    alert("no cargo el usuario " + cb2);
});

function productToHTML(productos, pos) {
    let sResultado = `         <tr id="info">
    <td width="10%">${pos + 1}</td>
    <td width="10%" align="center"><img src="${productos.imagen}"></td>
    <td width="20%">${productos.descripcion}</td>
    <td width="20%">${productos.categoria} </td>
    <td width="25%"><input type="number" id="cantidad" min="1" max="${productos.stock}" value=${productos.cantidad} style=" width:50px" ><br></td>
    <td width="25%"><button type="button" class="btn btn-danger" onclick="deleteProduct(${productos.id})">Eliminar</button></td>
    <td width="25%" class="text-center"> </td>
</tr>`;


    return sResultado;
}

function productListToHTML(productos) {

    let cartList;
    // Hacer get al carrito, mandar el usuario
    // map al carrito en vez de al local
    if (cart.items.length > 0) {
        cartList = cart.items.map((producto, pos) => {
            console.log(producto.stock);

            return productToHTML(producto, pos)
        })
    }
    console.table(cartList);
    let html = cartList.join("");
    carritoTabla.innerHTML += "" + html;
}


function deleteProduct(id) {
    console.log(id);
    console.log(cart.items)
    let deleteid = cart.items.findIndex(function (item) {
        return item.id === id
    });
    console.log(deleteid);
    cart.items.splice(deleteid, 1);

    modificarPedido(cart, 'http://localhost:3000/api/pedidos', function (cb1) {
        alert("Se ha elminado del carrito");
    }, function (cb2) {
        alert(cb2);
    });
    location.reload();
}


function sendCart() {
    if (cart.items.length > 0) {

        pedido.status = "Material entregado";

        console.log(pedido);

    modificarPedido(pedido, 'http://localhost:3000/api/pedidos', function (cb1) {
        alert("Status modificado");
    }, function (cb2) {
           alert(cb2);
    });

    } else {
        alert('El carrito esta vacio');
    }

    //localStorage.setItem('cart', JSON.stringify(cart));
}