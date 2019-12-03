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


//-------------------------------------------------------------------------------------

    let btnSubmit = document.getElementById('btnSubmit');
    let btnLogin = document.getElementById('loginButton_0');
    let btnRecover = document.getElementById('btnRecover');
    let registro = document.getElementById('registro');
    let form = registro.querySelector("form");
    let register = false;

    enableBtnConsult();
    enableBtnRegister();


    //---------------------------------------------------------
    function enableBtnConsult() {

        console.log(readCookie("token"))
        // Se lee la cookie
        if (readCookie("token") != null) {

        } else {

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

        localStorage.userDetalle = JSON.stringify(registerUser);

        loginAndRegisterHTTP(registerUser, 'http://localhost:3000/api/users', function (cb1) {
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
        loginUser.correo = document.getElementById('idToken1').value;
        console.log(loginUser.correo);
        loginUser.password = document.getElementById('idToken2').value;
        console.log(loginUser.password);

        localStorage.userDetalle = JSON.stringify(registerUser);

        if(loginUser.correo == 'admin' && loginUser.password == 'admin'){
            window.location.href = '../Administrador/homeAdmin.html'
        }else if(loginUser.correo == 'is709571'){
            window.location.href = '../Usuario/home.html'
        }else if(loginUser.correo == 'oscaroceguera'){
            alert('El usuario esta bloqueado, para mayor información pasar a la oficina de prestamos')
        }else{
            alert('El usuario no existe');
        }

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

    btnRecover.onclick = function (event) {
        let correoRecover = document.getElementById('recuperacion').value;
        let passAutoGen = 'contra';
    
        window.open('mailto:' + correoRecover +'?subject=Password&body=Auto Generated Password: ' + passAutoGen);

    }