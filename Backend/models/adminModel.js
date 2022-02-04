module.exports = (sequelize, DataTypes) => {
    
const Admin = sequelize.define('admin', {
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
    return Admin
}

