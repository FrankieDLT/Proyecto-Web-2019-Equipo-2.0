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
    }),
    new Product ({
        id:5,
      imagen:"https://www.steren.com.mx/media/catalog/product/cache/8a4fdc7d203276e60b54a94f4f1e185b/d/r/dron-500_x1_2.jpg",
      descripcion:"Dron",
      categoria:"Aereo",
      stock:6
    }),
    new Product ({
        id:6,
        imagen:"https://www.steren.com.mx/media/catalog/product/cache/8a4fdc7d203276e60b54a94f4f1e185b/m/u/mul-285_x1.jpg",
        descripcion:"Multimetro",
        categoria:"Electronica",
        stock:6
    }),
    new Product ({
        id:7,
      imagen:"https://www.steren.com.mx/media/catalog/product/cache/8a4fdc7d203276e60b54a94f4f1e185b/m/o/mov-1070_x1pl.jpg",
      descripcion:"Bateria",
      categoria:"Electronica",
      stock:15
    }),
    new Product ({
        id:8,
        imagen:"https://www.steren.com.mx/media/catalog/product/cache/8a4fdc7d203276e60b54a94f4f1e185b/a/u/aud-797_x1ne_2.jpg",
        descripcion:"Audifonos",
        categoria:"Audio",
        stock:7
    }),
    new Product ({
        id:9,
      imagen:"https://www.steren.com.mx/media/catalog/product/cache/8a4fdc7d203276e60b54a94f4f1e185b/p/o/pod-147_x1.jpg",
      descripcion:"Bluetooth",
      categoria:"Audio",
      stock:20
    }),
    new Product ({
        id:10,
        imagen:"https://www.steren.com.mx/media/catalog/product/cache/8a4fdc7d203276e60b54a94f4f1e185b/m/i/mic-650_x1_.jpg",
        descripcion:"Microfono",
        categoria:"Audio",
        stock:16
    }),
    new Product ({
        id:11,
        imagen:"https://www.steren.com.mx/media/catalog/product/cache/8a4fdc7d203276e60b54a94f4f1e185b/r/e/rec-854_x1.jpg",
        descripcion:"Grabadora",
        categoria:"Audio",
        stock:10
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
