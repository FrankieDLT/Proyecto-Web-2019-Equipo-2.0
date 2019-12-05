const express = require('express');
const randomize = require('randomatic');
const port = 3000;
const app = express();
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const carritoRouter = require('./routes/carrito');
const Token = require('./db/token');
const User = require('./db/users')

app.use(express.static(__dirname + '/FrontEnd/Registro y login (Publico)/'));
app.use('/admin', express.static(__dirname + '/FrontEnd/Administrador/'));
app.use('/admin/deudores', express.static(__dirname + '/FrontEnd/Administrador/Deudores.html'));
app.use('/home', express.static(__dirname + '/FrontEnd/Usuario/'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.use(express.json());
app.use('/api/users', usersRouter);

app.use('/api/products', authMiddleware);
app.use('/api/products', productsRouter);

app.use('/api/carrito', carritoRouter);
app.use('/api/carrito', authMiddleware);



app.post('/api/login', function (req, res) {
    // Programar aquí lógica de token
    User.find({correo: req.body.correo, password: req.body.password})
        .then(async users => {
            if(users.length > 0) {
                let user = users[0];
                let tokenString = randomize('Aa0','10')+'-'+user.id;

                await Token.findOneAndDelete({userId: user.id});
                let tokenDoc = Token({userId: user.id, token: tokenString});
                await tokenDoc.save();

                res.statusCode = 200;
                res.send({token: tokenString});
            }
            else {
                res.statusCode = 400;
                res.end();
            }
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
    
});

app.post('/api/users/info', function (req, res) {
    // Programar aquí lógica de token
    User.find({correo: req.body.correo, password: req.body.password})
        .then(async users => {
            if(users.length > 0) {
                let user = users[0];

                res.statusCode = 200;
                res.send(JSON.stringify(user));
            }
            else {
                res.statusCode = 400;
                res.end();
            }
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
    
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

async function authMiddleware(req, res, next) {
    if(!req.headers['x-auth-user']) {
        res.statusCode = 401;
        res.end();
    }
    else {
        // Validar que el token sea válido
        let tokenString = req.headers['x-auth-user'];
        let token = await Token.findOne({token: tokenString});
        if(token) {
            req.userId = token.userId;
            let user = await User.findById(token.userId);
            req.esAdmin = user.esAdmin;
            next();
        }
        else {
            res.statusCode = 401;
            res.end();
        }        
    }
}