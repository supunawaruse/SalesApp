const db = require('../models/index')

const Purchase = db.purchases
const Products = db.product
const Customer = db.customer
const PurchaseProducts = db.purchaseproduct

const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.findAll({
            include:[
                {
                    model:Products,
                },
            ]
        });
        res.status(200).send(purchases)
    } catch (error) {
        console.log(error);
    }
}

const getPurchaseById = async (req,res) => {
    try {
        const id = req.params.id
        const purchase = await Purchase.findOne({
            include:[
                {
                    model:Products,
                }
            ],
            where:{id:id}
        })
        if(purchase){
            res.status(200).send(purchase)
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
const addPurchase = async (req, res) => {
    
    const data = {
        total:req.body.total,
        admin_id:req.body.admin_id,
        supplier_id:req.body.supplier_id,
        purchaseDate: req.body.purchaseDate,
    }
    const products = req.body.products;

    try {
      const purchase = await Purchase.create(data)
       products.forEach( async (item) => {
        const product = await Products.findOne({where:{id:item.id}})
        await purchase.addProduct(product, { through: { quantity: item.quantity } })
       })
       res.status(201).send(purchase)
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const deletePurchase = async (req, res) => {
    try {
       console.log('To be implement');
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

module.exports = {getAllPurchases,addPurchase,deletePurchase,getPurchaseById}