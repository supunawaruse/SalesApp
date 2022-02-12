// module.exports = (sequelize, DataTypes) => {
//     const SaleProduct = sequelize.define('saleproduct', {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         quantity: {
//             type:DataTypes.INTEGER,
//             allowNull: false
//         },
//     })
//         return SaleProduct
//     }

module.exports = (sequelize, DataTypes) => {
const SaleProduct = sequelize.define('saleproduct', {
    quantity: {
        type:DataTypes.INTEGER,
        allowNull: false
    },
}, { timestamps: false });
return SaleProduct
}