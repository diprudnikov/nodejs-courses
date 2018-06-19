import express from 'express';
import productsController from '../../controllers/products';
import usersController from '../../controllers/users';
import authController from '../../controllers/authentication';
import checkToken from '../../middlewares/checkToken';

const apiRouter = express.Router();

apiRouter.get('/api/products', checkToken, productsController.getAllProductsHandler);

apiRouter.get('/api/products/:id', checkToken, productsController.getProductByIdHandler);

apiRouter.get('/api/products/:id/reviews', checkToken, productsController.getProductReviewsByIdHandler);

apiRouter.post('/api/products', checkToken, productsController.postNewProductHandler);

apiRouter.get('/api/users', checkToken, usersController.getAllUsersHandler);

apiRouter.post('/auth', authController.generateToken);

export default apiRouter;