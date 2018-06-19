import products from '../../models/products';

const getAllProductsHandler = (req, res) => {
    res.json(products);
};

const getProductByIdHandler = (req, res) => {
    const product = products.find(product => product.id === +req.params.id);
    res.json(product);
};

const getProductReviewsByIdHandler = (req, res) => {
    const product = products.find(product => product.id === +req.params.id);
    res.json(product.reviews);
};

const postNewProductHandler = (req, res) => {
    const product = {
        id: products.length + 1,
        reviews: [
            products[products.length - 2].reviews[0],
            products[products.length - 3].reviews[1],
        ]
    };
    products.push(product);
    res.json(product);
};

export { getAllProductsHandler, getProductByIdHandler, getProductReviewsByIdHandler, postNewProductHandler };