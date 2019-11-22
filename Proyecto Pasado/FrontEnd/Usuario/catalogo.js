let table = document.getElementById('tablecat');
let uid = 732019;
let Usuarios = [];


let us1 = {
  "id": uid,
  "image": 'https://www.steren.com.mx/media/catalog/product/cache/b69086f136192bea7a4d681a8eaf533d/image/20506a711/bocinas-vintage-multimedia-para-pc-laptop-de-70wpmpo.jpg',
  "nombre": 'Bocinas',
  "condicion": 'Excelente',
  "cantidad": '3'
};

Usuarios.push(us1);

uid += 5;

let us2 = {
  "id": uid,
  "image": 'https://www.radioshack.com.mx/medias/81228-1200ftw?context=cmFkaW9zaGFja3xyb290fDE4OTAxNHxpbWFnZS9naWZ8aGQ0L2g3MC84ODYwNTcwOTEwNzUwLmdpZnw0MGZlMjA1MGJkMjM3ZmE1OTdmODczYTBhNGY0ODdkMjk1NmI4MTM5MGE1NzdkZWQ4MGMzMzg1YzI5ODNiYjE5',
  "nombre": 'Cable Auxiliar',
  "condicion": 'Bueno',
  "cantidad": '5'
};

Usuarios.push(us2);

uid += 5;

let us3 = {
  "id": uid,
  "image": 'https://images-na.ssl-images-amazon.com/images/I/51GEClpO2kL._SX466_.jpg',
  "nombre": 'Adaptador HDMI',
  "condicion": 'Muy Bueno',
  "cantidad": '2'
};

Usuarios.push(us3);
userListToHTML(Usuarios);


let Modal = document.getElementById('registro');
let valid = Modal.querySelectorAll(':invalid'); //Se define con su valor inical
let Nombre = document.getElementById('nam');
let Condicion = document.getElementById('cond');
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
let newcond = document.getElementById('newcond');
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
  ${user.image}
  ${user.nombre}
  ${user.cantidad}
  ${user.condicion}
  */
  let sResultado = `<table border ="1" width ="100%">
      <tr>
          <td width="20%">${user.id}</td>
          <td width="20%" align="center"><img src="${user.image}"></td>  
          <td width="20%">${user.nombre}</td>       
          <td width="20%">${user.cantidad}</td>
          <td width="20%">${user.condicion}</td>
        </tr>
    </table>`;

  return sResultado;
} //FIN De userToHTML*********************************************************


function userListToHTML(lisUs) {

  let var_usuarios = lisUs.map(userToHTML);
  table.innerHTML = var_usuarios.join();

} //FIN De userListToHTML******************************************************


function addUser(u_n, u_i, u_ca, u_co) {
  /*Notes:
   ${user.image}
   ${user.nombre}
   ${user.cantidad}
   ${user.condicion}
   */
  uid += 5; //Se incrementa el User id que es numerico para que no se repitan

  let Nuser = {};

  Nuser.id = uid;
  Nuser.image = u_i;
  Nuser.nombre = u_n;

  if (u_co.toLowerCase() === 'excelente' || 
      u_co.toLowerCase() === 'muy bueno' ||
      u_co.toLowerCase() === 'bueno' ||
      u_co.toLowerCase() === 'dañado' ) {
          Nuser.condicion = u_co;
          }else{
          Nuser.condicion = 'Dañada';
          alert('CONDICION DEBE SER COMO SE MUESTRA EN EL TEXTO');
          }

  let finaca = 0;
  if (u_ca > -1) {
    Nuser.cantidad = u_ca;
  } else {
    Nuser.cantidad = finaca;
    alert('CANTIDAD INVALIDA');
  }


  function checkEm(user) {
    return user.nombre === u_n;
  }

  console.log(Usuarios.find(checkEm) === undefined);

  if (!(Usuarios.find(checkEm) === undefined)) {
    alert("Trató de registrarse equipo ya en uso, el equipo: " + u_n);
    Nuser = {};
    uid -= 5;
  } else {
    Usuarios.push(Nuser);
    userListToHTML(Usuarios);
  }


} //Fin de addUser*****************************************************************

bttnRegistrar.onclick = function () {
  event.preventDefault();

  let obj = {
    nombre: Nombre.value,
    image: Imagen.value,
    condicion: Condicion.value,
    cantidad: Cantidad.value
  }

  addUser(obj.nombre.trim(), obj.image.trim(), obj.cantidad.trim(), obj.condicion.trim());

};

sielibttn.onclick = function () { //Eliminar Equipos
  event.preventDefault();

  let ind = Usuarios.findIndex(obj => obj.nombre == Namel.value);
  console.log(Usuarios[ind]);

  if (ind == -1) {
    alert('Equipo no Registrado');
  } else {
    Usuarios.splice(ind, 1);
    userListToHTML(Usuarios);

  }

};

editabutto.onclick = function () { //Editar Equipos
  event.preventDefault();

  let ind = Usuarios.findIndex(obj => obj.nombre == oldnam.value.trim());
  let ind2 = Usuarios.findIndex(obj => obj.nombre == newnam.value.trim());
  console.log(Usuarios[ind]);
  console.log(Usuarios[ind2]);

  let equ = !(Usuarios[ind].id == Usuarios[ind2].id);
  console.log(equ);

  if (ind == -1) {
    alert('Equipo no Registrado');
  } else {

    
    if (ind2 != -1 && equ) {
      alert("Este nombre de equipo ya está en uso, el nombre: " + newnam.value.trim());
      Usuarios[ind].nombre = oldnam.value;
      
    } else {
      Usuarios[ind].nombre = newnam.value;}

    
      
      Usuarios[ind].image = newimm.value;

      if (newcond.value.toLowerCase() === 'excelente' || 
          newcond.value.toLowerCase() === 'muy bueno' ||
          newcond.value.toLowerCase() === 'bueno' ||
          newcond.value.toLowerCase() === 'dañado' ) {

        Usuarios[ind].condicion = newcond.value;
      } else {
        Usuarios[ind].condicion = 'Dañada';
        alert('CONDICION DEBE SER COMO SE MUESTRA EN EL TEXTO');
      }


      let finaca = 0;
      if (newcantd.value > -1) {

        Usuarios[ind].cantidad = newcantd.value;
      } else {
        Usuarios[ind].cantidad = finaca;
        alert('CANTIDAD INVALIDA');
      }

      userListToHTML(Usuarios);
    

  }

};