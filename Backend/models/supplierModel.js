module.exports = (sequelize, DataTypes) => {
    
    const Supplier = sequelize.define('supplier', {
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
        },
        location:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
        return Supplier
    }
    
    