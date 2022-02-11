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
db.sale = require('./salesModel')(sequelize,DataTypes)
db.saleproduct = require('./saleproduct')(sequelize,DataTypes)
db.stock = require('./stockModel')(sequelize,DataTypes)


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
db.purchases.belongsToMany(db.product, { through: db.purchaseproduct });
db.product.belongsToMany(db.purchases, { through: db.purchaseproduct });
// db.purchases.belongsToMany(db.product,{
//     through: db.purchaseproduct,
// })

// db.product.belongsToMany(db.purchases,{
//     through: db.purchaseproduct,
// })

// relationship between sale and customer
db.customer.hasMany(db.sale,{
    foreignKey: 'customer_id',
    as:'sale'
})

db.sale.belongsTo(db.customer,{
    foreignKey: 'customer_id',
    as:'customer'
})


//relationship between product and stock
db.product.hasMany(db.stock,{
    foreignKey: 'product_id',
    as:'stock'
})

db.stock.belongsTo(db.product,{
    foreignKey: 'product_id',
    as:'product'
})


module.exports = db