import express from 'express';
import productsController from '../../controllers/products';
import usersController from '../../controllers/users';

const apiRouter = express.Router();

apiRouter.get('/api/products', productsController.getAllProductsHandler);

apiRouter.get('/api/products/:id', productsController.getProductByIdHandler);

apiRouter.get('/api/products/:id/reviews', productsController.getProductReviewsByIdHandler);

apiRouter.post('/api/products', productsController.postNewProductHandler);

apiRouter.get('/api/users', usersController.getAllUsersHandler);

export default apiRouter;