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
    .put(async function(req, res){
        if (req.body) {
            let carro = await Carrito.findOne({usuario: req.body.usuario});

            carro.items = req.body.items;

            await carro.save();

            res.statusCode = 200;
            res.send(req.body);
            
        } else {
            res.statusCode = 401;
            res.end();
        }
    });

module.exports = router;