module.exports = (sequelize, DataTypes) => {
    
    const Customer = sequelize.define('customer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
           type:DataTypes.STRING,
           allowNull: false
        },
        phone: {
            type:DataTypes.STRING,
            allowNull: false
        }
    })
        return Customer
    }
    
    