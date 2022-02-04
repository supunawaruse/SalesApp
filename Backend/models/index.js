const dbConfig = require('../config/dbConfig')
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool:{
            max:dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.admins = require('./adminModel')(sequelize,DataTypes)
db.purchases = require('./purchaseModel')(sequelize,DataTypes)
db.supplier = require('./supplierModel')(sequelize, DataTypes)
db.product = require('./productModel')(sequelize,DataTypes)
db.purchaseproduct = require('./purchaseproduct')(sequelize,DataTypes)
db.customer = require('./customer')(sequelize,DataTypes)


db.sequelize.sync({alter:true}).then(()=>{
    console.log('Database Synced');
})

// relationship between admin and purchase
db.admins.hasMany(db.purchases,{
    foreignKey: 'admin_id',
    as:'purchase'
})

db.purchases.belongsTo(db.admins,{
    foreignKey: 'admin_id',
    as:'admin'
})

// relationship between supplier and purchase
db.supplier.hasMany(db.purchases,{
    foreignKey: 'supplier_id',
    as:'purchase'
})

db.purchases.belongsTo(db.supplier,{
    foreignKey: 'supplier_id',
    as:'supplier'
})

//relationship between product and purchase
db.purchases.belongsToMany(db.product,{
    through: db.purchaseproduct,
})

db.product.belongsToMany(db.purchases,{
    through: db.purchaseproduct,
})


module.exports = db