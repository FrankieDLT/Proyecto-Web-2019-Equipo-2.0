const mongoose = require('mongoose');

var Product = require('../db/products')
 
mongoose.connect('localhost:3000/shopping')

var products = [
    new Product ({
        id:0,
        imagen:"https://www.steren.com.mx/media/catalog/product/cache/8a4fdc7d203276e60b54a94f4f1e185b/2/0/206-700_x1.jpg",
        descripcion:"Cable HDMI",
        categoria:"Cables",
        stock:20
    }),
    new Product({
        id:1,
        imagen:"https://www.steren.com.mx/media/catalog/product/cache/8a4fdc7d203276e60b54a94f4f1e185b/3/x/3x16-08pb_x1c.jpg",
        descripcion:"Multicontacto",
        categoria:"Cables",
        stock:10
    }),
    new Product ({
        id:2,
        imagen:"https://www.steren.com.mx/media/catalog/product/cache/8a4fdc7d203276e60b54a94f4f1e185b/5/0/507-073_x1_11.jpg",
        descripcion:"Cable VGA",
        categoria:"Cables",
        stock:15
    }),
    new Product ({
        id:3,
        imagen:"https://www.steren.com.mx/media/catalog/product/cache/8a4fdc7d203276e60b54a94f4f1e185b/m/g/mg-260_x1.jpg",
        descripcion:"Megafono",
        categoria:"Audio",
        stock:3
    }),
    new Product ({
        id:4,
        imagen:"https://www.steren.com.mx/media/catalog/product/cache/8a4fdc7d203276e60b54a94f4f1e185b/b/o/boc-069_x1ne.jpg",
        descripcion:"Bocinas",
        categoria:"Audio",
        stock:8
    })
]; 


var done = 0;
for(var i = 0; i < products.length; i++){
    products[i].save(function(err,result) {
        done++; 
        if(done === products.length) {
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
