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

function userToHTML(user) {
    /*Notes:
    ${user.image}
    ${user.nombre}
    ${user.cantidad}
    ${user.condicion}
    */
    let sResultado = //<table border ="2" width ="100%">
    `<tr>
        <td width="20%" align="center"><img src="${user.Imagen}"></td>
        <td width="20%">${user.Nombre}</td>
        <td width="20%">${user.Apellidos}</td>
        <td width="20%">${user.Email}</td>
        <td width="20%">${user.Equipo_Prestado}</td>
    </tr>`;
    //</tr>  </table>
  
    return sResultado;
  } //FIN De userToHTML*********************************************************
  
  
  function userListToHTML(lisUs) {
  
    let var_usuarios = lisUs.map(userToHTML);
    tabdev.innerHTML = var_usuarios.join();
  
  } //FIN De userListToHTML******************************************************
  
  
  butbus.onclick = function () { //Liberar Equipos
    event.preventDefault();
  
    let ind = deus.findIndex(obj => obj.Email === Namel.value.trim());
    console.log(deus[ind]);
  
    if (ind == -1) {
      alert('Sin Para Equipo Liberar');
    } else {
        deus.splice(ind, 1);
      userListToHTML(deus);
  
    }
  
  };

  butbus.disabled = true;

  Namel.addEventListener("change", function (event) {
    if (Namel.value != '') {
        butbus.disabled = false;
    } else {
        butbus.disabled = true;
    }
  });