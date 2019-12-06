const mongoose = require('./mongodb-connect');

let pedidosSchema = mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  status: {
    type: string,
    required: true
  },
  items: {
    type: Array,
    require: true
  }
});

let Pedidos = mongoose.model('pedidos', pedidosSchema);

module.exports = Pedidos;