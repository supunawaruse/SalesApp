module.exports = (sequelize, DataTypes) => {
    const PurchaseProduct = sequelize.define('purchaseproduct', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
    })
        return PurchaseProduct
    }