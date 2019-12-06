const express = require('express');
const router = express.Router();
//const fs = require('fs');
const Products = require('../db/products')

router.route('/')
    .get((req, res) => {
        Products.find()
            .then(products => {
                res.statusCode = 200;
                res.send(products);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    })
    .post(async function (req, res) {
        console.log(req.body);
        if (req.body) {
            let userDocument = Products(req.body);
            await userDocument.save();

            res.statusCode = 200;
            res.send(userDocument);
        } else {
            res.statusCode = 401;
            res.end();
        }
    })
    .put(async function (req, res) {
        console.log(req.body);

        if (req.body) {
            let produ = await Products.findOne({
                _id: req.body._id
            });

            produ.imagen = req.body.imagen;
            produ.categoria = req.body.categoria;
            produ.descripcion = req.body.descripcion;
            produ.stock = req.body.stock;

            await produ.save();

            res.statusCode = 200;
            res.send(req.body);

        } else {
            res.statusCode = 401;
            res.end();
        }
    })

    .delete(async function (req, res) {
        console.log(req.body);

        if (req.body) {
            let produ = await Products.findOneAndDelete({_id: req.body._id});

            if (produ) {
                await produ.save();

                res.statusCode = 200;
                res.send(req.body);
            } else {
                res.statusCode = 401;
                res.end();
            }


        } else {
            res.statusCode = 401;
            res.end();
        }
    });

module.exports = router;