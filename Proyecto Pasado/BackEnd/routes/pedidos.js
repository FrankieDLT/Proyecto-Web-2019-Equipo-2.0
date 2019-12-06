const express = require('express');
const router = express.Router();
//const fs = require('fs');
const Pedidos = require('../db/pedidos');

router.route('/')
    .get((req, res) => {
        let userId = req.userId;
        Pedidos.find()
            .then(pedidos => {
                res.statusCode = 200;
                res.send(pedidos);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    })

    .post(async function(req, res){
        console.log(req.body);
        if (req.body) {
            let userDocument = Pedidos(req.body);
            await userDocument.save();

            res.statusCode = 200;
            res.send(userDocument);
        } else {
            res.statusCode = 401;
            res.end();
        }
    })

    .put(async function(req, res){
        console.log(req.body);
        
        if (req.body) {
            let pedidos = await Pedidos.findOne({_id: req.body._id});

            pedidos.fechaEntrega = req.body.fechaEntrega;
            pedidos.status = req.body.status;

            await pedidos.save();

            res.statusCode = 200;
            res.send(req.body);
            
        } else {
            res.statusCode = 401;
            res.end();
        }
    })
    
    .delete(async function(req, res){
        console.log(req.body);
        
        if (req.body) {
            let pedidos = await Pedidos.findOneAndDelete({_id: req.body._id});
            if(pedidos){
                await pedidos.save();

                res.statusCode = 200;
                res.send(req.body);
            } else{
                res.statusCode = 401;
                res.end();
            }
            
            
        } else {
            res.statusCode = 401;
            res.end();
        }
    });

module.exports = router;