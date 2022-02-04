module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define('purchase', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        purchaseDate: {
           type:DataTypes.DATE,
           allowNull: false
        },
        total: {
            type:DataTypes.FLOAT,
            allowNull: false
        },
    })
        return Purchase
    }