localStorage.userToken = '';
localStorage.userDetalle = '';
//Json que se manda con el registro
let registerUser = {
    nombre: "Luis D",
    apellido: "Gallegos Godoy",
    correo: "is709571@iteso.mx",
    url: "",
    sexo: "H",
    fecha: "12-05-1998",
    password: "1234"
}

//Json que se manda con el Login
let loginUser = {
    correo: "",
    password: ""
}

function readCookie(name) {

    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

}

function readCookie(name) {

    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

}

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

        /*loginAndRegisterHTTP(registerUser, 'https://users-dasw.herokuapp.com/api/users', function (cb1) {
            alert('Usuario creado');
        }, function (cb2) {
            alert('El usuario ya existe');
        });*/

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
        }else{
            window.location.href = '../Usuario/home.html'
        }

        /*loginAndRegisterHTTP(loginUser, 'https://users-dasw.herokuapp.com/api/login', function (cb1) {

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
        });*/
    }

    btnRecover.onclick = function (event) {
        let correoRecover = document.getElementById('recuperacion').value;
        let passAutoGen = 'contra';
    
        window.open('mailto:' + correoRecover +'?subject=Password&body=Auto Generated Password: ' + passAutoGen);

    }