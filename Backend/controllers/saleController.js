const db = require('../models/index')

const Sale = db.sale
const SaleProduct = db.saleproduct
const Products = db.product

const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include:[
                {
                    model:Products,
                }
            ]
        });
        res.status(200).send(sales)
    } catch (error) {
        console.log(error);
    }
}


const getSaleById = async (req,res) => {
    try {
        const id = req.params.id
        const sale = await Sale.findOne({
            include:[
                {
                    model:Products,
                }
            ],
            where:{id:id}
        })
        if(sale){
            res.status(200).send(sale)
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

/********************************************************************/
const addSale = async (req, res) => {
    
    const data = {
        total:req.body.total,
        customer_id:req.body.customer_id,
        salesDate:req.body.salesDate,
        toBePaid:req.body.toBePaid
    }

    const products = [{id:1,name:'Creation Flex Mask', buyingPrice:3.5, category:'Child Mask'}]

    try {
       const sale = await Sale.create(data)
       products.forEach( async (item) =>{
        const saleProductData = {
            quantity:10,
            saleId:sale.id,
            productId:item.id
        }
      await SaleProduct.create(saleProductData)
   })
       res.status(201).send(sale)
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const deleteSale = async (req, res) => {
    try {
        console.log('To be implement');
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

module.exports = {getAllSales,addSale,deleteSale,getSaleById}