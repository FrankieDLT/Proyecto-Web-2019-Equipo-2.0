const express = require('express');
const router = express.Router();
const fs = require('fs');

router.route('/')
    .get((req, res) => {
        fs.readFile('./data/users.json', (err, data) => {
            if(err) {
                res.statusCode = 500;
                res.end();
            }
            else {
                res.statusCode = 200;
                res.send(JSON.parse(data));
            }
        });
    })
    .post(async function (req, res) {
        let newUser = req.body;

        // Validar si vienen las propiedades
        if(!newUser.nombre || !newUser.apellido || !newUser.correo || !newUser.sexo || !newUser.fecha || !newUser.password) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: nombre, apellido, correo, sexo, fecha y password');
        }
        else {
            // Validar si existe un usuario con el mismo correo o nombres y apellidos
            let sameEmailUser = JSON.parse(fs.readFileSync('./data/users.json')).filter(u => u.correo == newUser.correo);
            let sameNameUser = JSON.parse(fs.readFileSync('./data/users.json')).filter(u => u.nombre == newUser.nombre && u.apellido == newUser.apellido);

            if(sameEmailUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo correo');
            }
            else if(sameNameUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo nombre');
            }
            else {
                let currentArray = JSON.parse(fs.readFileSync('./data/users.json'));
                newUser.id = currentArray.length + 1;
                currentArray.push(newUser);
                fs.writeFile('./data/users.json', JSON.stringify(currentArray), (err) => {
                    if(err) {
                        res.statusCode = 500;
                        res.send(err);
                    }
                    else {
                        res.statusCode = 201;
                        res.send(newUser);
                    }
                });
            }
        }
    });

module.exports = router;