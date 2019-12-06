const mongoose = require('./mongodb-connect');

let carritoSchema = mongoose.Schema({
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    items: {
      type: Array,
      require: true
    }
});

let Carrito = mongoose.model('carrito', carritoSchema);

module.exports = Carrito;