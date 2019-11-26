const express = require('express');
const router = express.Router();
const fs = require('fs');

router.route('/')
    .get((req, res) => {
        fs.readFile('./data/products.json', (err, data) => {
            if(err) {
                res.statusCode = 500;
                res.end();
            }
            else {
                res.statusCode = 200;
                res.send(JSON.parse(data));
            }
        });
    });

module.exports = router;