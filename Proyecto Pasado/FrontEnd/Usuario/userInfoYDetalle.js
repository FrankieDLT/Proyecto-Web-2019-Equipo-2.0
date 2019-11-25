localStorage.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA5NTcxIiwiaWF0IjoxNTczNDA5NTUwfQ.k7K2brH6uGVSapPdZonHL7otxd5cV14AyI8FnPYLBPA";
localStorage.userToken = '';
localStorage.userDetalle = '';
//Json que se manda con el registro
let registerUser = {
    nombre: "",
    apellido: "",
    correo: "",
    url: "",
    sexo: "",
    fecha: "",
    password: ""
}

//Json que se manda con el Login
let loginUser = {
    correo: "",
    password: ""
}

function readCookie(name) {

    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

}

///////////////////////////HTTP////////////////////////////

//Esta funcion manda correo y contraseña, verifica si el usuario existe o la contraseña es corecta.
function loginAndRegisterHTTP(datos, url, cbOk, cbErr) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('POST', url);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
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

//Esta funcion edita al usuario
function editUserHTTP(datos, url, cbOk, cbErr) {
    let usertoken = JSON.parse(readCookie("token"));
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('PUT', url);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
    if (usertoken == null) {
        alert('La sesión a caducado, vuelve a inciar sesión');
        window.location.href = 'index.html';
    }
    xhr.setRequestHeader('x-user-token', localStorage.userToken);
    // 4. Enviar solicitud al servidor
    xhr.send([JSON.stringify(datos)]);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.status != 200 && xhr.status != 201) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            cbErr(xhr.status + ': ' + xhr.statusText);
        } else {
            let datos = (xhr.responseText);
            console.log(xhr.responseText); // Significa que fue exitoso
            cbOk(datos);
        }
    };
}

//Esta funcion recibe el correo y el token del usuario para ser eliminado.
function deleteUserHTTP(url, cbOk, cbErr) {
    let usertoken = JSON.parse(readCookie("token"));
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('DELETE', url);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
    if (usertoken == null) {
        alert('La sesión a caducado, vuelve a inciar sesión');
        window.location.href = 'index.html';
    }
    xhr.setRequestHeader('x-user-token', localStorage.userToken);
    // 4. Enviar solicitud al servidor
    xhr.send();
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200 && xhr.status != 201) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            cbErr(xhr.status + ': ' + xhr.statusText);
        } else {
            console.log(xhr.responseText); // Significa que fue exitoso
            let datos = xhr.responseText;
            cbOk(datos);
        }
    };
}


function userListHTTP(url, cbOk, cbErr) {
    let userLogin = JSON.parse(readCookie("token"));
    //console.log(userLogin.token);
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', url);
    // 4. Se envian los headers
    xhr.setRequestHeader('x-auth', localStorage.token);
    if (userLogin == null) {
        alert('La sesión a caducado, vuelve a inciar sesión');
        window.location.href = 'index.html';
    }
    xhr.setRequestHeader('x-user-token', userLogin.token);
    // 5. Enviar solicitud
    xhr.send();
    // 6. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            cbErr(xhr.status + ': ' + xhr.statusText);
            // ejecutar algo si error
        } else {
            let datos = JSON.parse(xhr.response); //esta es la línea que hay que probar
            // Ejecutar algo si todo está correcto
            //console.log(datos); // Significa que fue exitoso
            cbOk(datos);
        }
    };
}


if (document.getElementById('chabacano') != null) {
    /////////////////////////////INDEX//////////////////////////////
    let btnSubmit = document.getElementById('btnSubmit');
    let btnLogin = document.getElementById('btnLogin');
    let registro = document.getElementById('registro');
    let form = registro.querySelector("form");
    let register = false;

    enableBtnConsult();
    enableBtnRegister();


    //---------------------------------------------------------
    function enableBtnConsult() {
        let btnConsult = document.getElementById('con1');
        let btnConsultA = document.getElementById('con2');

        console.log(readCookie("token"))
        // Se lee la cookie
        if (readCookie("token") != null) {
            btnConsult.classList.remove('disabled');
            btnConsultA.classList.remove('disabled');
        } else {
            btnConsult.classList.add('disabled');
            btnConsultA.classList.add('disabled');
        }
    }

    //---------------------------------------------------------
    function enableBtnRegister() {
        form.querySelector('button').disabled = 'true';

        form.addEventListener("change", function (e) {

            let invalids = registro.querySelectorAll(':invalid');

            for (let i = 0; i < 8; i++) {
                if (i == 4 && form[3].value != '' && form[4].value != '') {
                    if (form[3].value == form[4].value) {
                        form[4].style.border = "";
                        register = true;
                    } else {
                        alert('Las contraseñas no coinciden')
                        form[4].style.border = "thin dotted red";
                        register = false;
                    }

                } else {
                    if (form[i].checkValidity()) {
                        form[i].style.border = "";
                    } else {
                        form[i].style.border = "thin dotted red";
                    }
                }

            }
            //loginAndRegisterHTTP
            console.log(invalids.length);

            if (invalids.length == 0 && register == true) {
                form.querySelector('button').disabled = false;

            } else {
                form.querySelector('button').disabled = 'true';
            }

        });
    }

    //---------------------------------------------------------
    btnSubmit.onclick = function (event) {
        event.preventDefault();
        registerUser.nombre = form[0].value;
        registerUser.apellido = form[1].value;
        registerUser.correo = form[2].value;
        registerUser.password = form[4].value;
        registerUser.fecha = form[5].value;
        registerUser.sexo = document.register.sexo.value;
        registerUser.url = form[8].value;
        console.log(registerUser);

        loginAndRegisterHTTP(registerUser, 'https://users-dasw.herokuapp.com/api/users', function (cb1) {
            alert('Usuario creado');
        }, function (cb2) {
            alert('El usuario ya existe');
        });

        for (let i = 0; i < 8; i++) {
            if (i != 5 || i != 6) form[i].value = null;
            form.querySelector('button').disabled = 'true';
        }
    }

    //---------------------------------------------------------
    btnLogin.onclick = function (event) {
        loginUser.correo = document.getElementById('correo').value;
        loginUser.password = document.getElementById('password').value;

        loginAndRegisterHTTP(loginUser, 'https://users-dasw.herokuapp.com/api/login', function (cb1) {

            let hoy = (new Date());
            hoy.setDate(hoy.getDate());
            hoy.setMonth(hoy.getMonth());
            hoy.setFullYear(hoy.getFullYear());
            hoy.setHours(hoy.getHours());
            hoy.setMinutes(hoy.getMinutes() + 10);
            let expiresDate = new Date(hoy);

            console.log(expiresDate);

            // Creamos una cookie
            document.cookie = "token=" + encodeURIComponent(JSON.stringify(cb1)) + "; expires=" + expiresDate.toUTCString();

            localStorage.userToken = JSON.stringify(cb1);
            window.location.href = 'consulta.html'

        }, function (cb2) {
            alert('Nombre de usuario o contraseña incorrecta');
        });
    }

    //---------------------------------------------------------
} else if (document.getElementById('chabacano2') != null) {
    /////////////////////////////CONSULTA//////////////////////////////
    let btnSave = document.getElementById('btnSave');
    let btnErase = document.getElementById('btnErase');
    let btnFind = document.getElementById('btnBusqueda');
    let edit = document.getElementById("editar");
    let form = edit.querySelector("form");
    let borrar = document.getElementById("erase");
    let form2 = borrar.querySelector("form");
    let busqueda = document.getElementById('busqueda');
    let busquedaValor;
    let pestaña = 1;
    let e = false;
    let listUsers;
    render();

    function muestreo(num){
        console.log(num);
        pestaña = num;
        mostrarListaUsuarios();
    }

    function render() {
        userListHTTP('https://users-dasw.herokuapp.com/api/users', function (cb1) {
            listUsers = cb1;
            mostrarListaUsuarios();
        }, function (cb2) {

        });

    }

    function mostrarListaUsuarios() {
        let lista = document.getElementById('lista');
        let index = (pestaña * 2) - 1;

        for(let i = 1; i < ((listUsers.length+1)/2)+1; i++){
            var nodeLi = document.createElement("LI"); // Create a <li> node
            nodeLi.classList.add("page-item");
            let nodeA = document.createElement("A");
            nodeA.classList.add("page-link");
            nodeA.href = "#";
            nodeA.value = i;
            
            var textnode = document.createTextNode(i); // Create a text node
            nodeA.appendChild(textnode); // Append the text to <li>
            nodeLi.appendChild(nodeA);
            //nodeLi.onclick = muestreo(i);
            document.getElementById("paginacion").appendChild(nodeLi); // Append <li> to <ul> with id="myList"
        } 

        if (listUsers[0] != undefined) {
            let user1;
            let sex1;
            let user2;
            let sex2;
            userListHTTP('https://users-dasw.herokuapp.com/api/users/' + listUsers[index - 1].correo, function (cb1) {
                user1 = cb1;
                if (user1.sexo == 'H') {
                    sex1 = 'Hombre';
                } else {
                    sex1 = 'Mujer';
                }

                if (listUsers[index] != undefined) {

                    userListHTTP('https://users-dasw.herokuapp.com/api/users/' + listUsers[index].correo, function (cb1) {
                        user2 = cb1;
                        if (user2.sexo == 'H') {
                            sex2 = 'Hombre';
                        } else {
                            sex2 = 'Mujer';
                        }
                        redenrizarHTML();
                    }, function (cb2) {

                    });
                } else {
                    redenrizarHTML();
                }
            }, function (cb2) {

            });

            function redenrizarHTML() {
                if (listUsers[index - 1] != undefined && listUsers[index] != undefined) {
                    lista.innerHTML = `<div class="media col-8 mt-2" id="modelo">
            <div class="media-left align-self-center mr-3">
                <img class="rounded-circle" style="width: inherit;" src="${user1.url}">
            </div>
            <div class="media-body">
                <h4>${user1.nombre}</h4>
                <p >Correo: ${user1.correo}</p>
                <p >Fecha de nacimiento: ${user1.fecha} </p>
                <p >Sexo: ${sex1} </p>
            </div>
            <div class="media-right align-self-center">
                <div class="row">
                    <a href="#" class="btn btn-primary edit" onclick="verDetalle('${user1.correo}')"><i class="fas fa-search edit  "></i></a>
                </div>
                <div class="row">
                <a href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#editar" onclick="editar('${user1.correo}')"><i class="fas fa-pencil-alt edit  "></i></a>
                </div>
                <div class="row">
                    <a href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#erase" onclick="eliminar('${user1.correo}')"><i class="fas fa-trash-alt  remove "></i></i></a>
                </div>
            </div>
        </div>
        <div class="media col-8 mt-2">
            <div class="media-left align-self-center mr-3">
                <img class="rounded-circle" style="width: inherit;" src="${user2.url}">
            </div>
            <div class="media-body">
                <h4>${user2.nombre}</h4>
                <p >Correo: ${user2.correo}</p>
                <p >Fecha de nacimiento: ${user2.fecha} </p>
                <p >Sexo: ${sex2} </p>
            </div>
            <div class="media-right align-self-center">
                <div class="row">
                    <a href="#" class="btn btn-primary edit" onclick="verDetalle('${user2.correo}')"><i class="fas fa-search edit  "></i></a>
                </div>
                <div class="row">
                <a href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#editar" onclick="editar('${user2.correo}')"><i class="fas fa-pencil-alt edit  "></i></a>
                </div>
                <div class="row">
                    <a href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#erase" onclick="eliminar('${user2.correo}')"><i class="fas fa-trash-alt  remove "></i></i></a>
                </div>
            </div>
        </div>`
                } else if (listUsers[index - 1] != undefined) {
                    lista.innerHTML = `<div class="media col-8 mt-2" id="modelo">
                    <div class="media-left align-self-center mr-3">
                        <img class="rounded-circle" style="width: inherit;" src="${user1.url}">
                    </div>
                    <div class="media-body">
                        <h4>${user1.nombre}</h4>
                        <p >Correo: ${user1.correo}</p>
                        <p >Fecha de nacimiento: ${user1.fecha} </p>
                        <p >Sexo: ${sex1} </p>
                    </div>
                    <<div class="media-right align-self-center">
                    <div class="row">
                        <a href="#" class="btn btn-primary edit" onclick="verDetalle('${user1.correo}')"><i class="fas fa-search edit  "></i></a>
                    </div>
                    <div class="row">
                        <a href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#editar" onclick="editar('${user1.correo}')"><i class="fas fa-pencil-alt edit  "></i></a>
                    </div>
                    <div class="row">
                        <a href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#erase" onclick="eliminar('${user1.correo}')"><i class="fas fa-trash-alt  remove "></i></i></a>
                    </div>
                </div>
                </div>`
                }


            }

        }
    }

    function verDetalle(correo) {
        console.log('verDetalle ' + correo)

        userListHTTP('https://users-dasw.herokuapp.com/api/users/' + correo, function (cb1) {

            localStorage.userDetalle = cb1;

            let hoy = (new Date());
            hoy.setDate(hoy.getDate());
            hoy.setMonth(hoy.getMonth());
            hoy.setFullYear(hoy.getFullYear());
            hoy.setHours(hoy.getHours());
            hoy.setMinutes(hoy.getMinutes() + 10);
            let expiresDate = new Date(hoy);

            console.log(expiresDate);

            // Creamos una cookie
            document.cookie = "userDetalle=" + encodeURIComponent(JSON.stringify(cb1)) + "; expires=" + expiresDate.toUTCString();

            window.location.href = 'detalle.html'

        }, function (cb2) {

        });

    }

    function editar(correo) {
        console.log('editar ' + correo)
        let user;
        userListHTTP('https://users-dasw.herokuapp.com/api/users/' + correo, function (cb1) {
            user = cb1;
            console.log(user);
            form[0].value = user.nombre;
            form[1].value = user.apellido;
            form[2].value = user.correo;
            form[2].disabled = 'true';
            form[3].value = user.password;
            form[4].value = user.password;
            form[5].value = user.fecha;
            if (user.sexo == 'M') {
                form[6].checked = true;
                form[7].checked = false;
            } else {
                form[6].checked = false;
                form[7].checked = true;
            }
            form[6].disabled = 'true';
            form[7].disabled = 'true';
            form[8].value = user.url;

        }, function (cb2) {

        });

        form.querySelector('button').disabled = 'true';

        form.addEventListener("change", function (e) {

            let invalids = edit.querySelectorAll(':invalid');

            for (let i = 0; i < 8; i++) {
                if (i == 4 && form[3].value != '' && form[4].value != '') {
                    if (form[3].value == form[4].value) {
                        form[4].style.border = "";
                        e = true;
                    } else {
                        alert('Las contraseñas no coinciden')
                        form[4].style.border = "thin dotted red";
                        e = false;
                    }

                } else {
                    if (form[i].checkValidity()) {
                        form[i].style.border = "";
                    } else {
                        form[i].style.border = "thin dotted red";
                    }
                }

            }
            //loginAndRegisterHTTP
            console.log(invalids.length);

            if (invalids.length == 0 && e == true) {
                form.querySelector('button').disabled = false;

            } else {
                form.querySelector('button').disabled = 'true';
            }

        });

    }

    btnSave.onclick = function (event) {
        event.preventDefault();
        registerUser.nombre = form[0].value;
        registerUser.apellido = form[1].value;
        registerUser.correo = form[2].value;
        registerUser.password = form[4].value;
        registerUser.fecha = form[5].value;
        if (form[6].checked == true) {
            registerUser.sexo = 'M';
        } else {
            registerUser.sexo = 'H';
        }
        registerUser.url = form[8].value;
        console.log(registerUser);

        loginUser.correo = registerUser.correo;
        loginUser.password = registerUser.password;

        loginAndRegisterHTTP(loginUser, 'https://users-dasw.herokuapp.com/api/login', function (cb1) {
            localStorage.userToken = cb1.token;
            console.log(localStorage.userToken);
            editUserHTTP(registerUser, 'https://users-dasw.herokuapp.com/api/users/' + registerUser.correo, function (cb1) {
                alert('Usuario Actualizado');
                render();
            }, function (cb2) {
                alert('Error al actualizar');
            });
        }, function (cb2) {

        });

    }

    function eliminar(correo) {
        console.log('eliminar ' + correo)
        userListHTTP('https://users-dasw.herokuapp.com/api/users/' + correo, function (cb1) {
            user = cb1;
            loginUser.correo = user.correo;
            loginUser.password = user.password;

        }, function (cb2) {

        });
        btnErase.disabled = 'true';

        form2.onkeyup = function () {
            if (form2[0].value.length > 1) {
                if (form2[0].value == 'SI') {
                    form2.querySelector('button').disabled = false;
                } else {
                    form2.querySelector('button').disabled = 'true';
                    alert('Escriba la palabra °SI° en letras mayúsculas');
                    form2[0].value = null;
                }
            }


        };

    }

    btnErase.onclick = function (event) {
        loginAndRegisterHTTP(loginUser, 'https://users-dasw.herokuapp.com/api/login', function (cb1) {
            localStorage.userToken = cb1.token;
            console.log(localStorage.userToken);
            deleteUserHTTP('https://users-dasw.herokuapp.com/api/users/' + loginUser.correo, function (cb1) {
                alert('Usuario Eliminado');
                render();
            }, function (cb2) {
                alert('Error al Eliminar');
            });
        }, function (cb2) {

        });
    }

    busqueda.onkeyup = function () {
        busquedaValor = busqueda.value;
    };

    btnFind.onclick = function (event) {
        userListHTTP('https://users-dasw.herokuapp.com/api/users?nombre=' + busquedaValor, function (cb1) {
            listUsers = cb1;
            mostrarListaUsuarios();
        }, function (cb2) {

        });
    }

} else {
    let userDetalle = JSON.parse(readCookie("userDetalle"));
    console.log(userDetalle);
    let lista = document.getElementById('lista');

    if (userDetalle.sexo == 'H') {
        sex = 'Hombre';
    } else {
        sex = 'Mujer';
    }

    lista.innerHTML = `<div class="media col-8 mt-2" id="modelo">
                    <div class="media-left align-self-center mr-3">
                        <img class="rounded-circle" style="width: inherit;" src="${userDetalle.url}">
                    </div>
                    <div class="media-body">
                        <h4>${userDetalle.nombre}</h4>
                        <p >Apellido: ${userDetalle.apellido} </p>
                        <p >Correo: ${userDetalle.correo}</p>
                        <p >Fecha de nacimiento: ${userDetalle.fecha} </p>
                        <p >Sexo: ${sex} </p>
                        <p >Contraseña: ${userDetalle.password} </p>

                    </div>
                    <div class="media-right align-self-center">   
                </div>
                </div>`
}