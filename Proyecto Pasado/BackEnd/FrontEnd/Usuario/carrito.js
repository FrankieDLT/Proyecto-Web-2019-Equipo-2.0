var cart = {
    items: []
};

let productoList = {
    items: []
}

 url = 'http://localhost:5000/api/carrito'
//limpiar localStorage
 //localStorage.setItem('cart', JSON.stringify(cart));

if(localStorage.cart) {
    cart = JSON.parse(localStorage.cart);
}

function productToHTML(productos, pos){
    let sResultado =`         <tr id="info">
    <td width="10%">${pos + 1}</td>
    <td width="10%" align="center"><img src="${productos.imagen}"></td>
    <td width="20%">${productos.descripcion}</td>
    <td width="20%">${productos.categoria} </td>
    <td width="25%"><input type="number" min="1" max="${productos.stock}" value=${productos.cantidad} style=" width:50px" ><br></td>
    <td width="25%"><button type="button" class="btn btn-danger" onclick="deleteProduct(${productos.id})">Eliminar</button></td>
    <td width="25%" class="text-center"> </td>
</tr>`; 


    return sResultado;
}

function productListToHTML (productos){
    let cartList;
    // Hacer get al carrito, mandar el usuario
    // map al carrito en vez de al local
    if (cart.items.length > 0) {
    cartList = cart.items.map( (producto, pos) => {
        console.log(producto.stock);

         return productToHTML(producto, pos)
         } )
    }
     console.table(cartList);
     let html = cartList.join("");
     carritoTabla.innerHTML += "" + html;
 }

 productListToHTML()


 function deleteProduct(id){
    console.log(cart.items)
    let deleteid = cart.items.findIndex(function (item) { return item.id === id});
    console.log(deleteid);
    cart.items.splice(deleteid,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
 }

 //--------------------Get cart-------------------------------
 function loadJSONCart(url, cbOk = callback_ok, cbErr) {
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


console.log(JSON.parse(localStorage.cart))

console.log(cart.items)
