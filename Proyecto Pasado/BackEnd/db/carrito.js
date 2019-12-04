const mongoose = require('./mongodb-connect');

let carritoSchema = mongoose.Schema({
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    items: [{
        id: Number,
        imagen: String,
        descripcion: String,
        categoria: String,
        stock: String,
        cantidad: Number
    }]
});

let Carrito = mongoose.model('carrito', carritoSchema);

module.exports = Carrito;