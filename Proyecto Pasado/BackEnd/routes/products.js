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
    .post(async function(req, res){
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
    });

module.exports = router;