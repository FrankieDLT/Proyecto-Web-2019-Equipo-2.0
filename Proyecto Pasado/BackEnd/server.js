const express = require('express');
const randomize = require('randomatic');
const port = 3000;
const app = express();
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const carritoRouter = require('./routes/carrito');
const pedidosRouter = require('./routes/pedidos');
const Token = require('./db/token');
const User = require('./db/users');
const Carrito = require('./db/carrito');
const Productos = require('./db/products');
const Pedidos = require('./db/pedidos');
const cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/FrontEnd/Registro y login (Publico)/'));
app.use('/admin', express.static(__dirname + '/FrontEnd/Administrador/'));
app.use('/admin/pedidos', express.static(__dirname + '/FrontEnd/Administrador/Deudores.html'));
app.use('/admin/detallePedidos', express.static(__dirname + '/FrontEnd/Administrador/detallePedidos.html'));
app.use('/home', express.static(__dirname + '/FrontEnd/Usuario/'));
app.use('/home/carrito', express.static(__dirname + '/FrontEnd/Usuario/carrito.html'));

let corsConfig = {
    origin: "*"
}
app.use(cors(corsConfig));

app.use(express.json());
app.use('/api/users', usersRouter);

app.use('/api/products', authMiddleware);
app.use('/api/products', productsRouter);

app.use('/api/pedidos', authMiddleware);
app.use('/api/pedidos', pedidosRouter);

app.use('/api/carrito', carritoRouter);
//app.use('/api/carrito', authMiddleware);



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
    User.find({correo: req.body.correo})
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

app.post('/api/pedidos/info', function (req, res) {
    // Programar aquí lógica de token
    Pedidos.find({correo: req.body.correo})
        .then(async pedidos => {
            if(pedidos.length > 0) {
                let user = pedidos[0];

                res.statusCode = 200;
                res.send(JSON.stringify(pedidos));
            }
            else {
                res.statusCode = 400;
                res.send("No tiene pedidos");
                res.end();
            }
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
    
});

app.post('/api/carrito/info', function (req, res) {
    console.log ("LLegue a carrito info")
    // Programar aquí lógica de token
    Carrito.find({usuario: req.body.usuario})
        .then(async items => {
           
                let items2 = items;

                res.statusCode = 200;
                res.send(JSON.stringify(items2));
            
          
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
    
});

app.post('/api/productos/info', function (req, res) {
    console.log ("LLegue a producto info")
    // Programar aquí lógica de token
    Productos.find({_id: req.body._id})
        .then(async pro => {
           
                let pro2 = pro;

                res.statusCode = 200;
                res.send(JSON.stringify(pro2));
            
          
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
            req.admin = user.admin;
            next();
        }
        else {
            res.statusCode = 401;
            res.end();
        }        
    }
}