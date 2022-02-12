
const db = require('../models/index')
const {Op} =  require('sequelize')

const Sale = db.sale
const SaleProduct = db.saleproduct
const Products = db.product
const Customer = db.customer

const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include:[
                {
                    model:Products,
                    as:'products'
                },
                {
                    model:Customer,
                    as:'customer',
                    attributes:['name']
                }

            ]
        });
        res.status(200).send(sales)
    } catch (error) {
        console.log(error);
    }
}

const getRecentSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include:[
                {
                    model:Products,
                    as:'products'
                },
                {
                    model:Customer,
                    as:'customer',
                    attributes:['name']
                },
            ],
            limit:2,
            order:[['id','DESC']]
        });
        res.status(200).send(sales)
    } catch (error) {
        console.log(error);
    }
}


const getPaidToBe = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include:[
                {
                    model:Customer,
                    as:'customer',
                    attributes:['name','phone']
                },
            ],
            where:{toBePaid:{[Op.gt]:0}}
        });
        res.status(200).send(sales)
    } catch (error) {
        console.log(error);
    }
}

// const getSaleById = async (req,res) => {
//     try {
//         const id = req.params.id
//         const sale = await Sale.findOne({
//             include:[
//                 {
//                     model:Products,
//                 }
//             ],
//             where:{id:id}
//         })
//         if(sale){
//             res.status(200).send(sale)
//         }else{
//             res.status(404).send({
//                 message:'Admin Not Found'
//             })
//             throw new Error("Admin Not Found")
//         }
        
//     } catch (error) {
//         console.log(error);
//     }
// }

/********************************************************************/
const addSale = async (req, res) => {
    
    const data = {
        total:req.body.total,
        customer_id:req.body.customer_id,
        salesDate: req.body.salesDate,
        toBePaid:req.body.toBePaid !== '' ? parseInt(req.body.toBePaid) : 0
    }
    const products = req.body.products;

    try {
        const sale = await Sale.create(data)
        products.forEach( async (item) => {
        const product = await Products.findOne({where:{id:item.id}})
        await sale.addProduct(product, { through: { quantity: item.quantity } })
       })
       res.status(201).send(sale)
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const updateSaleToPaid = async (req,res) => {
    try {
        const id = req.params.id
        const sale = await Sale.findOne({where:{id:id}})
        
        if(sale){
            await Sale.update(req.body,{where:{id:id}})
            res.status(200).send({message:'Updated Successfully'})
        }else{
            res.status(404).send({
                message:'Admin Not Found'
            })
            throw new Error("Admin Not Found")
        }
        
    } catch (error) {
        console.log(error);
    }
}

// const deleteSale = async (req, res) => {
//     try {
//         console.log('To be implement');
//     } catch (error) {
//         res.send(400).send({message:'This is an error'})
//         console.log(error);
//     }
// }

module.exports = {getAllSales,addSale,getRecentSales,getPaidToBe,updateSaleToPaid}