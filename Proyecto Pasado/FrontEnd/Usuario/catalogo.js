let table = document.getElementById('tablecat');
let uid = 732019;
let Usuarios=[];


let Modal = document.body;
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


function userToHTML(user){
   /*Notes:
   ${user.image}
   ${user.nombre}
   ${user.cantidad}
   ${user.condicion}
   */
      let sResultado = `<table border ="1" width ="100%">
      <tr>
          <td width="20%">${user.id}</td>
          <td width="20%"><img src="${user.image}"></td>  
          <td width="20%">${user.nombre}</td>       
          <td width="20%">${user.cantidad}</td>
          <td width="20%">${user.condicion}</td>
        </tr>
    </table>`;
  
      return sResultado;
  }//FIN De userToHTML*********************************************************


  function userListToHTML(lisUs){

    let var_usuarios = lisUs.map(userToHTML);
    table.innerHTML=var_usuarios.join();
    
  }//FIN De userListToHTML******************************************************


function addUser(u_n,u_i,u_ca,u_co){
    /*Notes:
   ${user.image}
   ${user.nombre}
   ${user.cantidad}
   ${user.condicion}
   */
 uid+=5;//Se incrementa el User id que es numerico para que no se repitan

 let Nuser={};
 
 Nuser.id=uid;
 Nuser.image=u_i;
 Nuser.nombre=u_n;
 Nuser.condicion=u_co;
 Nuser.cantidad=u_ca;
 
 
 function checkEm(user){
 return user.nombre===u_n;
 }
 
 console.log(Usuarios.find(checkEm)===undefined);
 
 if(!(Usuarios.find(checkEm)===undefined)){
   alert("Trató de registrarse equipo ya en uso, el equipo: " + u_n);
   Nuser={};
   uid-=5;
 }else{
    Usuarios.push(Nuser);
    userListToHTML(Usuarios);
 }
    
    
 }//Fin de addUser*****************************************************************

 bttnRegistrar.onclick = function () {
    event.preventDefault();
  
    let obj = {
      nombre: Nombre.value,
      image: Imagen.value,
      condicion: Condicion.value,
      cantidad: Cantidad.value
    }
    
    addUser(obj.nombre,obj.image,obj.cantidad,obj.condicion);
  
  };