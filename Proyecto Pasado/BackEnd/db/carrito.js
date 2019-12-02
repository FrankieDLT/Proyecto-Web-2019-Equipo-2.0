const mongoose = require('./mongodb-connect');

let carritoSchema = mongoose.Schema({
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    items: [{
        imagen: String,
        descripcion: String,
        categoria: String,
        stock: String,
        cantidad: Number,
        id: Number
    }]
});

let Carrito = mongoose.model('carrito', carritoSchema);

module.exports = Carrito;