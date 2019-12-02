const express = require('express');
const router = express.Router();
//const fs = require('fs');
const Carrito = require('../db/carrito');

router.route('/')
    .get(async (req, res) => {
        try {
            let userId = req.userId;
            let carrito = await Carrito.find({usuario: userId});

            res.statusCode = 201;
            res.send(carrito);
        } catch (e) {
            res.statusCode = 500;
            res.end();
        }
    })
    .post(async (req, res) => {
        try {
            //         imagen: String,
            //         descripcion: String,
            //         categoria: String,
            //         stock: String,
            //         cantidad: Number,
            //         idProducto: Number
            let producto = req.body;

            let userId = req.userId;
            let carrito = await Carrito.findOne({usuario: userId});
            const itemIndex = carrito.items.findIndex(productoCheck => productoCheck.id === producto.id);

            if (itemIndex < 0) {
                carrito.items.push(producto);
            } else {
                carrito.items[itemIndex].cantidad = producto.cantidad;
            }

            carrito.save();

            res.statusCode = 201;
            res.send(carrito);
        } catch (e) {
            res.statusCode = 500;
            res.end();
        }
    });

module.exports = router;