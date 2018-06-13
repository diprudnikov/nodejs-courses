import express from 'express';
import products from '../../models/products';
import users from '../../models/users';

const apiRouter = express.Router();

apiRouter.get('/api/products', (req, res) => {
    res.json(products);
});

apiRouter.get('/api/products/:id', (req, res) => {
    const product = products.find(product => product.id === +req.params.id);
    res.json(product);
});

apiRouter.get('/api/products/:id/reviews', (req, res) => {
    const product = products.find(product => product.id === +req.params.id);
    res.json(product.reviews);
});

apiRouter.post('/api/products', (req, res) => {
    const product = {
        id: products.length + 1,
        reviews: [
            products[products.length - 2].reviews[0],
            products[products.length - 3].reviews[1],
        ]
    };
    products.push(product);
    res.json(product);
});

apiRouter.get('/api/users', (req, res) => {
    res.json(users);
});

export default apiRouter;