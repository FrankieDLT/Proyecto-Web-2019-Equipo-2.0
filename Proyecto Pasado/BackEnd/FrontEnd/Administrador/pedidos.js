localStorage.pedidoDetalle = '';

let deus = [];
let idPedido = {
  _id: ""
}

let tabdev = document.getElementById('tabdeb');

let butbus = document.getElementById('elimbutt');
let Namel = document.getElementById('namel');


pedidosListToHTML(deus);

//*******************************************************************/

console.log(JSON.parse(localStorage.userToken).token)
GETHTTP(deus, 'http://localhost:3000/api/pedidos', JSON.parse(localStorage.userToken).token, function (cb1) {

  deus = cb1;
  console.log(deus)

  pedidosListToHTML(deus);

}, function (cb2) {
  alert('ERROR');
});

//*******************************************************************/

function pedidoToHTML(pedido) {
  moment.locale('es');

  let fecha = moment(pedido.fecha);
  var full = fecha.format('dddd D, MMMM YYYY');
  let fechaEntrega = moment(pedido.fechaEntrega);
  var full2 = fechaEntrega.format('dddd D, MMMM YYYY');


  let sResultado = `<table border ="1" width ="100%">
    <tr>
        <td width="25%" align="center">${pedido._id}</td>
        <td width="25%" align="center">${full}</td>
        <td width="25%" align="center">${full2}</td>
        <td width="9%" align="center">${pedido.status}</td>
        <td width="9%" align="center">${pedido.correo}</td>
        <td width="7%" align="center"><button><a onclick="irADetallle('${pedido.correo}')">√</a></button></td>
    </tr>
    </table>`;

  return sResultado;
} //FIN De pedidoToHTML*********************************************************

function irADetallle(lisUs) {

  localStorage.pedidoDetalle = lisUs;
  window.location.href = "../admin/detallePedidos"

}

function pedidosListToHTML(lisUs) {

  let var_usuarios = lisUs.map(pedidoToHTML);
  tabdev.innerHTML = var_usuarios.join();

} //FIN De pedidosListToHTML******************************************************

//Liberar Equipos*****************************************************************
butbus.onclick = function () {
  event.preventDefault();

  let ind = deus.findIndex(obj => obj._id == Namel.value.trim());
  if (ind == -1) {
    alert('El id ingreado es incorrecto');
  } else {
    idPedido._id = Namel.value.trim();
    console.log(idPedido);

    DELETEHTTP(idPedido, 'http://localhost:3000/api/pedidos', JSON.parse(localStorage.userToken).token, function (cb1) {
      alert('Pedido Liberado');

      location.reload();
    }, function (cb2) {
      alert(cb2);
    });
  }




};
//FIN de liberar equipos******************************************************

butbus.disabled = true;

Namel.addEventListener("change", function (event) {
  if (Namel.value != '') {
    butbus.disabled = false;
  } else {
    butbus.disabled = true;
  }
});

function GETHTTP(datos, url, token, cbOk, cbErr) {
  // 1. Crear XMLHttpRequest object
  let xhr = new XMLHttpRequest();
  // 2. Configurar:  PUT actualizar archivo
  xhr.open('GET', url);
  // 3. indicar tipo de datos JSON
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('x-auth-user', token);
  // 4. Enviar solicitud al servidor
  xhr.send([JSON.stringify(datos)]);
  // 5. Una vez recibida la respuesta del servidor
  xhr.onload = function () {
    console.log(xhr.status);
    if (xhr.status != 200 && xhr.status != 201) { // analizar el estatus de la respuesta HTTP
      // Ocurrió un error
      cbErr(xhr.status + ': ' + xhr.statusText);
    } else {
      if (xhr.status != 201) {
        let datos = JSON.parse(xhr.responseText);
        cbOk(datos);
      }

    }
  };
}

function DELETEHTTP(datos, url, token, cbOk, cbErr) {
  // 1. Crear XMLHttpRequest object
  let xhr = new XMLHttpRequest();
  // 2. Configurar:  PUT actualizar archivo
  xhr.open('DELETE', url);
  // 3. indicar tipo de datos JSON
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('x-auth-user', token);
  // 4. Enviar solicitud al servidor
  xhr.send([JSON.stringify(datos)]);
  console.log(datos);
  // 5. Una vez recibida la respuesta del servidor
  xhr.onload = function () {
    console.log(xhr.status);
    if (xhr.status != 200 && xhr.status != 201) { // analizar el estatus de la respuesta HTTP
      // Ocurrió un error
      console.log(xhr.status + ': ' + xhr.statusText);
      cbErr(xhr.status + ': ' + xhr.statusText);
    } else {
      let datos = JSON.parse(xhr.responseText);
      console.log(datos); // Significa que fue exitoso
      cbOk(datos);
    }
  };
}