import Sequelize from 'sequelize';
import database from '../db';

// module.exports = (sequelize, DataTypes) => {
//   const Product = sequelize.define('Product', {
//     name: DataTypes.STRING,
//     reviews: DataTypes.STRING
//   }, {});
//   Product.associate = function(models) {
//     // associations can be defined here
//   };
//   return Product;
// };

const Product = database.define('Product', {
    name: {
        type: Sequelize.STRING
    },
    reviews: {
        type: Sequelize.STRING
    },
});

export default Product;