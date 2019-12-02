const mongoose = require('./mongodb-connect')

let carritoSchema = mongoose.Schema({
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
    },
    cantidad: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
});

let Carrito = mongoose.model('carrito', carritoSchema);

module.exports = Carrito;