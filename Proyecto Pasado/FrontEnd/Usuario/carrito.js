var cart = {
    items: []
};


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

console.log(JSON.parse(localStorage.cart))

console.log(cart.items)
