const express = require('express');
const router = express.Router();
//const fs = require('fs');
const Carrito = require('../db/carrito');

router.route('/')
    .get((req, res) => {
        let userId = req.userId;
        Carrito.find()
            .then(carrito => {
                res.statusCode = 200;
                res.send(carrito);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    })

    .post(async (req, res) => {
        let newItem = req.body; 
        if(!newItem.imagen || !newItem.descripcion || !newItem.categoria || !newUser.stock || !newItem.idProducto) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: imagen, descripcion, categoria, stock, idProducto');
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
        
    
    });

module.exports = router;