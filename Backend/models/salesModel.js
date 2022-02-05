module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define('sales', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        salesDate: {
           type:DataTypes.DATE,
           allowNull: false
        },
        total: {
            type:DataTypes.FLOAT,
            allowNull: false
        },
        toBePaid:{
            type:DataTypes.FLOAT,
            allowNull: false
        }
    })
        return Sales
    }