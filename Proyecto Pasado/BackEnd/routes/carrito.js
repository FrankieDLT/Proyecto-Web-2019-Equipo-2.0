const express = require('express');
const router = express.Router();
//const fs = require('fs');
const Carrito = require('../db/carrito')

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
    .post((req, res) => {
        if(req.esAdmin) {        
            res.statusCode = 200;
            res.end();
        }
        else {
            res.statusCode = 401;
            res.end();
        }
    });

module.exports = router;