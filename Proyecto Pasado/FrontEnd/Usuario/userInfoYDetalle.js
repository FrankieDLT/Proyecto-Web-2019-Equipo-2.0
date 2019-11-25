//Json que se manda con el registro
let UserInfo = {
    nombre: "Luis David",
    apellido: "Gallegos Godoy",
    correo: "is709571@iteso.mx",
    url: "https://randomuser.me/api/portraits/men/1.jpg",
    sexo: "H",
    fecha: "12-05-1998",
    password: "1234"
}


function readCookie(name) {

    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

}

//---------------------------------------------------------
if (document.getElementById('chabacano2') != null) {
    /////////////////////////////CONSULTA//////////////////////////////
    let btnSave = document.getElementById('btnSave');
    let edit = document.getElementById("editar");
    let form = edit.querySelector("form");
    let borrar = document.getElementById("erase");

    render();

    function muestreo(num) {
        console.log(num);
        pestaña = num;
        mostrarUsuario();
    }

    function render() {
        mostrarUsuario();
    }

    function mostrarUsuario() {
        let lista = document.getElementById('lista');
            let user1;
            let sex1;

            user1 = UserInfo;
            if (user1.sexo == 'H') {
                sex1 = 'Hombre';
            } else {
                sex1 = 'Mujer';
            }
            redenrizarHTML();

        function redenrizarHTML() {
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
            </div>
        </div>`

        }


    }

    function verDetalle(correo) {
        console.log('verDetalle ' + correo)

        //userListHTTP('https://users-dasw.herokuapp.com/api/users/' + correo, function (cb1) {

            localStorage.userDetalle = UserInfo;

            let hoy = (new Date());
            hoy.setDate(hoy.getDate());
            hoy.setMonth(hoy.getMonth());
            hoy.setFullYear(hoy.getFullYear());
            hoy.setHours(hoy.getHours());
            hoy.setMinutes(hoy.getMinutes() + 10);
            let expiresDate = new Date(hoy);

            console.log(expiresDate);

            // Creamos una cookie
            document.cookie = "userDetalle=" + encodeURIComponent(JSON.stringify(UserInfo)) + "; expires=" + expiresDate.toUTCString();

            window.location.href = 'detalleUser.html'

       /* }, function (cb2) {

        });*/

    }

    function editar(correo) {
        console.log('editar ' + correo)
        let user;
        //userListHTTP('https://users-dasw.herokuapp.com/api/users/' + correo, function (cb1) {
            user = UserInfo;
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

        /*}, function (cb2) {

        });*/

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

        //loginAndRegisterHTTP(loginUser, 'https://users-dasw.herokuapp.com/api/login', function (cb1) {
            /*localStorage.userToken = cb1.token;
            console.log(localStorage.userToken);
            editUserHTTP(registerUser, 'https://users-dasw.herokuapp.com/api/users/' + registerUser.correo, function (cb1) {*/
                alert('Usuario Actualizado');
                render();
            /*}, function (cb2) {
                alert('Error al actualizar');
            });
        }, function (cb2) {

        });*/

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