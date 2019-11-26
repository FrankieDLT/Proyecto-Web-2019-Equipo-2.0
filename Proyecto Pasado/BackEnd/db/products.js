const mongoose = require('./mongodb-connect')

let productsSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

let Products = mongoose.model('prodcuts', productsSchema);

module.exports = User;