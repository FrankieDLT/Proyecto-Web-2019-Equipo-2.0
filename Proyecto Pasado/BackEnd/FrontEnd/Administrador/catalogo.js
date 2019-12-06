let table = document.getElementById('tablecat');
let uid = 732019;
let Usuarios = [];
let dburl = 'http://localhost:3000/api/products';

let us1 = {
  "id": uid,
  "image": 'https://www.steren.com.mx/media/catalog/product/cache/b69086f136192bea7a4d681a8eaf533d/image/20506a711/bocinas-vintage-multimedia-para-pc-laptop-de-70wpmpo.jpg',
  "nombre": 'Bocinas',
  "cantidad": '3'
};

Usuarios.push(us1);

uid += 5;

let us2 = {
  "id": uid,
  "image": 'https://www.radioshack.com.mx/medias/81228-1200ftw?context=cmFkaW9zaGFja3xyb290fDE4OTAxNHxpbWFnZS9naWZ8aGQ0L2g3MC84ODYwNTcwOTEwNzUwLmdpZnw0MGZlMjA1MGJkMjM3ZmE1OTdmODczYTBhNGY0ODdkMjk1NmI4MTM5MGE1NzdkZWQ4MGMzMzg1YzI5ODNiYjE5',
  "nombre": 'Cable Auxiliar',
  "cantidad": '5'
};

Usuarios.push(us2);

uid += 5;

let us3 = {
  "id": uid,
  "image": 'https://images-na.ssl-images-amazon.com/images/I/51GEClpO2kL._SX466_.jpg',
  "nombre": 'Adaptador HDMI',
  "cantidad": '2'
};

Usuarios.push(us3);
userListToHTML(Usuarios);
//MONGO. UPDATE
//*********************************************************************************
console.log(JSON.parse(localStorage.userToken).token)
GETHTTP(Usuarios, 'http://localhost:3000/api/products',JSON.parse(localStorage.userToken).token, function (cb1) {
            Usuarios = cb1;
            console.log(Usuarios)
            
            userListToHTML(Usuarios);

        }, function (cb2) {
            alert('ERROR');
        });




/********************* */


let Modal = document.getElementById('registro');
let valid = Modal.querySelectorAll(':invalid'); //Se define con su valor inical
let Nombre = document.getElementById('nam');
let Categoria = document.getElementById('cond');
let Cantidad = document.getElementById('cantd');
let Imagen = document.getElementById('imm');

let bttnRegistrar = document.getElementById('Registrar');
bttnRegistrar.disabled = true;

Modal.addEventListener("change", function (event) {

  valid = Modal.querySelectorAll(':invalid'); //Se actualiza conforme a los cambios

  if (valid.length == 0) {
    bttnRegistrar.disabled = false;
  } else {
    bttnRegistrar.disabled = true;
  }

});


let Namel = document.getElementById('namel');
let Elimbutt = document.getElementById('elimbutt');
Elimbutt.disabled = true;
let sielibttn = document.getElementById('sielib');

Namel.addEventListener("change", function (event) {
  if (Namel.value != '') {
    Elimbutt.disabled = false;
  } else {
    Elimbutt.disabled = true;
  }
});

let modaedit = document.getElementById('edicion');

let oldnam = document.getElementById('oldnam');
let newnam = document.getElementById('newnam');
let newategoria = document.getElementById('newcond');
let newcantd = document.getElementById('newcantd');
let newimm = document.getElementById('newimm');

let editabutto = document.getElementById('editabutto');
editabutto.disabled = true;
let valid2 = editabutto.querySelectorAll(':invalid');

modaedit.addEventListener("change", function (event) {

  valid2 = modaedit.querySelectorAll(':invalid'); //Se actualiza conforme a los cambios

  if (valid2.length == 0) {
    editabutto.disabled = false;
  } else {
    editabutto.disabled = true;
  }


});


function userToHTML(user) {
  /*Notes:
  ${user.image} -> ${user.imagen}
  ${user.nombre} -> ${user.descripcion}
  ${user.categoria}
  ${user.cantidad} -> ${user.stock}
  */
  let sResultado = `<table border ="1" width ="100%">
      <tr>
          <td width="25%" align="center">${user._id}</td>
          <td width="25%" align="center"><img src="${user.imagen}"></td>  
          <td width="25%" align="center">${user.descripcion}</td>   
          <td width="15%"align="center">${user.categoria}</td>    
          <td width="10%" align="center">${user.stock}</td>
        </tr>
    </table>`;

  return sResultado;
} //FIN De userToHTML*********************************************************


function userListToHTML(lisUs) {

  let var_usuarios = lisUs.map(userToHTML);
  table.innerHTML = var_usuarios.join();

} //FIN De userListToHTML******************************************************


function addUser(u_n, u_i, u_ca,u_cat) {
  /*Notes:
   ${user.image}
   ${user.nombre}
   ${user.cantidad}
   */
  uid += 5; //Se incrementa el User id que es numerico para que no se repitan

  let Nuser = {};

  Nuser.imagen = u_i;
  Nuser.descripcion = u_n;
  Nuser.categoria = u_cat;


  let finaca = 0;
  if (u_ca > -1) {
    Nuser.stock = u_ca;
  } else {
    Nuser.stock = finaca;
    alert('CANTIDAD INVALIDA');
  }


  function checkEm(user) {
    return user.descripcion === u_n;
  }
  //CHECK del arreglo ya que está cargado con la información del backend
  console.log(Usuarios.find(checkEm) === undefined);

  if (!(Usuarios.find(checkEm) === undefined)) {
    alert("Trató de registrarse equipo ya en uso, el equipo: " + u_n);
    Nuser = {};
  } else {



//Post en el backend
POSTHTTP(Nuser, 'http://localhost:3000/api/products',JSON.parse(localStorage.userToken).token,function (cb1) {
    
  alert('SUCCESS');

  userListToHTML(Usuarios);

}, function (cb2) {
  alert('ERROR');
  console.log(JSON.parse(localStorage.userToken).token);

});
//Post en el backend


/*Inutil después del backend
    Usuarios.push(Nuser);*/

    userListToHTML(Usuarios);




  }


} //Fin de addUser*****************************************************************

bttnRegistrar.onclick = function () {
  event.preventDefault();

  let obj = {
    nombre: Nombre.value,
    image: Imagen.value,
    cantidad: Cantidad.value,
    categoria: Categoria.value
  }

  addUser(obj.nombre.trim(), obj.image.trim(), obj.cantidad.trim(),obj.categoria.trim());

};

sielibttn.onclick = function () { //Eliminar Equipos
  event.preventDefault();

  let ind = Usuarios.findIndex(obj => obj.descripcion == Namel.value);
  console.log(Usuarios[ind]);

  if (ind == -1) {
    alert('Equipo no Registrado');
  } else {

    //DELETE DE EQUIPO USANDO Usuarios[ind]*******************************************************
    //INUTILIZADO POR BACKEND:  Usuarios.splice(ind, 1);



    DELETEHTTP(Usuarios[ind], 'http://localhost:3000/api/products',JSON.parse(localStorage.userToken).token, function (cb1) {
      alert('Eliminación Completada Sin Errores');
      console.log('Eliminación Completada Sin Errores');
      
      userListToHTML(Usuarios);

  }, function (cb2) {
      alert(cb2);
  });



    userListToHTML(Usuarios);
    //DELETE DE EQUIPO****************************************************************************

  }

};

//Editar Equipos**********************************************************************************
editabutto.onclick = function () { 
  event.preventDefault();

  let ind = Usuarios.findIndex(obj => obj.descripcion == oldnam.value.trim());
  let ind2 = Usuarios.findIndex(obj => obj.descripcion == newnam.value.trim());

    console.log("break");
  console.log(Usuarios[ind]);
  console.log(Usuarios[ind2]);

  let equ = false;

  if(Usuarios[ind2]!= undefined){
    equ = !(Usuarios[ind].id == Usuarios[ind2].id);
}

  console.log(equ);

  if (ind == -1) {
    alert('Equipo no Registrado');
  } else {

    
    if (ind2 != -1 && equ) {
      alert("Este nombre de equipo ya está en uso, el nombre: " + newnam.value.trim());
      Usuarios[ind].descripcion = oldnam.value.trim();
      
    } else {
      Usuarios[ind].descripcion = newnam.value.trim();}

    
      
      Usuarios[ind].imagen = newimm.value.trim();

      Usuarios[ind].categoria = newategoria.value.trim();



      let finaca = 0;
      if (newcantd.value > -1) {

        Usuarios[ind].stock = newcantd.value;
      } else {
        Usuarios[ind].stock = finaca;
        alert('CANTIDAD INVALIDA');
      }


      //FUNCION DE PUT CON Usuarios[ind]


      PUTHTTP(Usuarios[ind], 'http://localhost:3000/api/products',JSON.parse(localStorage.userToken).token,function (cb1) {
    
        
      
        userListToHTML(Usuarios);
      
      }, function (cb2) {
        alert(cb2);
        console.log(JSON.parse(localStorage.userToken).token);
      
      });


      userListToHTML(Usuarios);
      //FUNCION DE PUT

  }
};



//BackEnd*************************************
function makeRequest(sMethod, sURL, headers, body, cbOk, cbErr) {
  let xhr = new XMLHttpRequest();
  xhr.open(sMethod, sURL);
  if(headers!=null) {
      xhr.setRequestHeader('x-auth-user', headers);
  }
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(body));
  xhr.onload = () => {
      if(xhr.status != 200) {
          cbErr(xhr.status, xhr.statusText);
      }
      else {
          console.log(JSON.parse(xhr.responseText)); // Significa que fue exitoso
          cbOk(JSON.parse(xhr.responseText));
      }
  };
}



function GETHTTP(datos, url,token, cbOk, cbErr) {
  // 1. Crear XMLHttpRequest object
  let xhr = new XMLHttpRequest();
  // 2. Configurar:  PUT actualizar archivo
  xhr.open('GET', url);
  // 3. indicar tipo de datos JSON
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('x-auth-user', token);
  // 4. Enviar solicitud al servidor
  xhr.send();
  // 5. Una vez recibida la respuesta del servidor
  xhr.onload = function () {
      console.log(xhr.status);
      if (xhr.status != 200 && xhr.status != 201) { // analizar el estatus de la respuesta HTTP
          // Ocurrió un error
          cbErr(xhr.status + ': ' + xhr.statusText);
      } else {
          if (xhr.status != 201) {
              let datos = JSON.parse(xhr.responseText);
              console.log(datos); // Significa que fue exitoso
              cbOk(datos);
          }

      }
  };
}

function POSTHTTP(datos, url,token, cbOk, cbErr) {
  // 1. Crear XMLHttpRequest object
  let xhr = new XMLHttpRequest();
  // 2. Configurar:  PUT actualizar archivo
  xhr.open('POST', url);
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
          console.log(xhr.status + ': ' + xhr.statusText);
          cbErr(xhr.status + ': ' + xhr.statusText);
      } else {   
              let datos = JSON.parse(xhr.responseText);
              console.log(datos); // Significa que fue exitoso
              cbOk(datos);
      }
  };
}

function PUTHTTP(datos, url,token, cbOk, cbErr) {
  // 1. Crear XMLHttpRequest object
  let xhr = new XMLHttpRequest();
  // 2. Configurar:  PUT actualizar archivo
  xhr.open('PUT', url);
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
          console.log(xhr.status + ': ' + xhr.statusText);
          cbErr(xhr.status + ': ' + xhr.statusText);
      } else {   
              let datos = JSON.parse(xhr.responseText);
              console.log(datos); // Significa que fue exitoso
              cbOk(datos);
      }
  };
}



function DELETEHTTP(datos, url,token, cbOk, cbErr) {
  // 1. Crear XMLHttpRequest object
  let xhr = new XMLHttpRequest();
  // 2. Configurar:  PUT actualizar archivo
  xhr.open('DELETE', url);
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
          console.log(xhr.status + ': ' + xhr.statusText);
          cbErr(xhr.status + ': ' + xhr.statusText);
      } else {   
              let datos = JSON.parse(xhr.responseText);
              console.log(datos); // Significa que fue exitoso
              cbOk(datos);
      }
  };
}