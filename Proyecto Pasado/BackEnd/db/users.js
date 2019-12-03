const mongoose = require('./mongodb-connect')

let userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    sexo: {
        type: String,
        enum: ['M', 'H'],
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    carrito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carrito'
    },
    admin: {
        type: Boolean,
        required: true
    },
    block: {
        type: Boolean
    }
});

userSchema.statics.addUser = function(user) {
    console.log(user);
    let newUser = User(user);
    return newUser.save();
}

let User = mongoose.model('users', userSchema);

module.exports = User;