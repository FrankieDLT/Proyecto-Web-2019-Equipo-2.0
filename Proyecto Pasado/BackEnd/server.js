const express = require('express');
const randomize = require('randomatic');
const port = 3000;
const app = express();
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use(express.json());
app.use('/api/users', usersRouter);
//app.use('/api/products', authMiddleware);
app.use('/api/products', productsRouter);


app.post('/api/login', async function (req, res) {
    // Programar aquí lógica de token
    // let tokenString = randomize('Aa0','10')+'-'+user.id;
    res.statusCode = 200;
    res.end();
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
        next();
    }
}