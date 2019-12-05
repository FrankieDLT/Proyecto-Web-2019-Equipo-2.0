const mongoose = require('./mongodb-connect');

let pedidosSchema = mongoose.Schema({
    fecha: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    fecha: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
    status: [{
        id: Number,
        imagen: String,
        descripcion: String,
        categoria: String,
        stock: String,
        cantidad: Number
    }]
});

let Pedidos = mongoose.model('pedidos', pedidosSchema);

module.exports = Pedidos;