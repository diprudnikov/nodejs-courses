import Product from '../../models/product';

const getAllProductsHandler = (req, res) => {
    return Product.findAll().then(products => {
        const data = products.map(product => {
            return {
                id: product.dataValues.id,
                name: product.dataValues.name,
                reviews: product.dataValues.reviews,
            }
        });
        res.json(data);
    });
};

const getProductByIdHandler = (req, res) => {
    return Product.findAll({
        where: {
            id: +req.params.id
        }
    }).then(product => {
        const data = {
            id: product.dataValues.id,
            name: product.dataValues.name,
            reviews: product.dataValues.reviews,
        };
        res.json(data);
    });
};

const getProductReviewsByIdHandler = (req, res) => {
    return Product.findAll({
        where: {
            id: +req.params.id
        }
    }).then(product => {
        const data = {
            reviews: product.dataValues.reviews,
        };
        res.json(data);
    });
};

const postNewProductHandler = (req, res) => {
    const product = {
        name: 'dress',
        reviews: 'cool'
    };
    Product.sync().then(() => {
        return Product.create(product);
    });
    res.json(product);
};

export { getAllProductsHandler, getProductByIdHandler, getProductReviewsByIdHandler, postNewProductHandler };