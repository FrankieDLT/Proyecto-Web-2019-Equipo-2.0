let deus = [];
let tabdev = document.getElementById('tabdeb');

let butbus = document.getElementById('elimbutt');
let Namel = document.getElementById('namel');

let deu1 = {
    "Imagen": "../../Imagenes/lynda-carter-1.jpg",	
    "Nombre": "Linda",	
    "Apellidos": "Carter", 	
    "Email":"WW_Diana@gmail.com",
    "Equipo_Prestado": "Cable Auxiliar",
    "EquLiber": false
}

deus.push(deu1);


let deu2 = {
    "Imagen": "../../Imagenes/Saul.png",	
    "Nombre": "Saul",	
    "Apellidos": "Hudson", 	
    "Email":"GnRGuitar@hotmail.com",
    "Equipo_Prestado": "Bocinas",
    "EquLiber": false
}

deus.push(deu2);


let deu3 = {
    "Imagen": "../../Imagenes/Hugh.png",	
    "Nombre": "James",	
    "Apellidos": "Howlett", 	
    "Email":"XMCanadalover@gmail.com",
    "Equipo_Prestado": "Adaptador HDMI",
    "EquLiber": false
}

deus.push(deu3);

let deu4 = {
    "Imagen": "../../Imagenes/Lin.png",	
    "Nombre": "Usnavi",	
    "Apellidos": "Hamilton", 	
    "Email":"HawaianDude16@gmail.com",
    "Equipo_Prestado": "Bocinas",
    "EquLiber": false
}

deus.push(deu4);


let deu5 = {
    "Imagen": "../../Imagenes/Nolhan.png",	
    "Nombre": "Nathan",	
    "Apellidos": "North", 	
    "Email":"N_North@yahoo.com",
    "Equipo_Prestado": "Adaptador HDMI",
    "EquLiber": false
}

deus.push(deu5);

userListToHTML(deus);

//*******************************************************************/

console.log(JSON.parse(localStorage.userToken).token)
GETHTTP(deus, 'http://localhost:3000/api/users',JSON.parse(localStorage.userToken).token, function (cb1) {

            
            deus = cb1;
            console.log(deus)
            
            userListToHTML(deus);

        }, function (cb2) {
            alert('ERROR');
        });

//*******************************************************************/

function userToHTML(user) {
    /*Notes:
    ${user.url}
    ${user.nombre}
    ${user.correo}
    ${user.condicion}
    */
    let sResultado = //<table border ="2" width ="100%">
    `<tr>
        <td width="20%" align="center"><img src="${user.url}"></td>
        <td width="20%">${user.nombre}</td>
        <td width="20%">${user.apellido}</td>
        <td width="20%">${user.correo}</td>
        <td width="20%" align="center"><button><a href="../admin/detallePedidos">√</a></button></td>
    </tr>`;
    //</tr>  </table>
  
    return sResultado;
  } //FIN De userToHTML*********************************************************
  
  
  function userListToHTML(lisUs) {
  
    let var_usuarios = lisUs.map(userToHTML);
    tabdev.innerHTML = var_usuarios.join();
  
  } //FIN De userListToHTML******************************************************
  
  //Liberar Equipos*****************************************************************
  butbus.onclick = function () { 
    event.preventDefault();
  
    let ind = deus.findIndex(obj => obj.correo === Namel.value.trim());
    console.log(deus[ind]);
  
    if (ind == -1) {
      alert('Sin Para Equipo Liberar');
    } else {
    //Inutilizado por backend:    deus.splice(ind, 1);
    deus[ind].block = false;
    PUTHTTP(deus[ind], 'http://localhost:3000/api/users',JSON.parse(localStorage.userToken).token,function (cb1) {
      alert('SUCCESS')
        userListToHTML(deus);
      
      }, function (cb2) {
        alert(cb2);
        //console.log(JSON.parse(localStorage.userToken).token);
      
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

  function GETHTTP(datos, url,token, cbOk, cbErr) {
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
                console.log(datos); // Significa que fue exitoso
                cbOk(datos);
            }
  
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