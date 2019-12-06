const express = require('express');
const router = express.Router();
//const fs = require('fs');
const Users = require('../db/users');
const Carrito = require('../db/carrito');

router.route('/')
    .get((req, res) => {
        Users.find()
            .then(users => {
                res.statusCode = 200;
                res.send(users);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end;
            })
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
            let sameEmailUser = await Users.find({correo: newUser.correo});
            //let sameNameUser = await Users.find({nombre: newUser.nombre, apellido: newUser.apellido});

            if(sameEmailUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo correo');
            }
            else {
                try {
                    let userDocument = Users(newUser);
                    let carrito = new Carrito({usuario: userDocument.id});
                    userDocument.carrito = carrito.id;

                    await carrito.save();
                    await userDocument.save();

                    res.statusCode = 201;
                    res.send(userDocument);
                } catch (e) {
                    res.statusCode = 500;
                    res.end();
                }
            }
        }
    })
    
    .put(async function(req, res){
        console.log(req.body);
        
        if (req.body) {
            let usu = await Users.findOne({_id: req.body._id});

            usu.nombre = req.body.nombre;
            usu.apellido = req.body.apellido;
            usu.correo = req.body.correo;
            usu.url = req.body.url;
            usu.sexo = req.body.sexo ;
            usu.fecha = req.body.fecha ;
            usu.password = req.body.password ;
            usu.admin = req.body.admin ;
            usu.block = req.body.block ;
            usu.carrito = req.body.carrito ;

            await produ.save();

            res.statusCode = 200;
            res.send(req.body);
            
        } else {
            res.statusCode = 401;
            res.end();
        }
    });

module.exports = router;