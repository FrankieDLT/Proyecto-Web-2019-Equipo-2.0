const mongoose = require('./mongodb-connect');

let pedidosSchema = mongoose.Schema({
  correo: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  fechaEntrega: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    require: true
  }
});

let Pedidos = mongoose.model('pedidos', pedidosSchema);

module.exports = Pedidos;