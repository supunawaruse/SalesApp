module.exports = (sequelize, DataTypes) => {
    
    const Stock = sequelize.define('stock', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        stockQuantity: {
            type:DataTypes.INTEGER,
            allowNull: false
        }
    })
        return Stock
    }
    
    