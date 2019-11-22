var cart = {
    items: []
};


//limpiar localStorage
// localStorage.setItem('cart', JSON.stringify(cart));

if(localStorage.cart) {
    cart = JSON.parse(localStorage.cart);
}

function productToHTML(productos){
    let sResultado =`         <tr id="info">
    <td width="10%">2</td>
    <td width="10%" align="center"><img src="${productos.imagen}"></td>
    <td width="20%">${productos.nombre}</td>
    <td width="20%">${productos.categoria} </td>
    <td width="25%">${productos.cantidad}</td>
    <td width="25%" class="text-center"> </td>
</tr>`; 
    return sResultado;
}

function productListToHTML (productos){
    let cartList;
    if (cart.items.length > 0) {
    cartList = cart.items.map( producto => {
         return productToHTML(producto)
         } )
    }
     console.table(cartList);
     let html = cartList.join("");
     carritoTabla.innerHTML += "" + html;
 }

 productListToHTML()

console.log(JSON.parse(localStorage.cart))