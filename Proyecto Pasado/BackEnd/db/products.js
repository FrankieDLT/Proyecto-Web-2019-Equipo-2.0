const mongoose = require('./mongodb-connect')

let productsSchema = mongoose.Schema({
    imagen: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    } 
});

//let Products = 

module.exports = mongoose.model('Product', productsSchema);;