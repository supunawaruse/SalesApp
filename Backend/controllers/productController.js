const { stock } = require('../models/index')
const db = require('../models/index')

const Product = db.product
const Stock = db.stock

const getAllProducts = async (req,res) =>{
    try {
        const products = await Product.findAll({
            include:[{
                model:Stock,
                as:'stock'
            }],
        })
        res.status(200).send(products)
    } catch (error) {
        console.log(error)
    }
}

const getAllProductsWithoutStock = async (req,res) =>{
    try {
        const products = await Product.findAll()
        res.status(200).send(products)
    } catch (error) {
        console.log(error)
    }
}

const getAllProductById = async (req,res) =>{
    try {
        const id = req.params.id
        const product = await Product.findOne({where:{id:id}})
        if(product){
            res.status(200).send(product)
        }else{
            res.status(404).send({
                message:'Product Not Found'
            })
            throw new Error("Product Not Found")
        }
        
    } catch (error) {
        console.log(error);
    }
}

const getProductStock = async (req, res) => {
    try {
        
        const id = req.params.id
        const data = await Stock.findAll({
            include:[{
                model:Product,
                as:'product'
            }],
            where:{id:id}
        })
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send({
                message:'Product Not Found'
            })
            throw new Error("Product Not Found")
        }
        
    } catch (error) {
        console.log(error);
    }
}


const addProduct = async (req, res) =>{
    const data = {
        name:req.body.name,
        category: req.body.category,
        buyingPrice:req.body.buyingPrice,
    }

    try {
        const product = await Product.create(data)
        res.status(201).send(product)
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({where:{id:id}})
        
        if(product){
            await Product.update(req.body,{where:{id:id}})
            res.status(200).send({message:'Updated Successfully'})
        }else{
            res.status(404).send({
                message:'product Not Found'
            })
            throw new Error("product Not Found")
        }
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const deleteProduct = async (req,res) =>{
    try {
        const id = req.params.id
        const product = await Product.findOne({where:{id:id}})
        
        if(product){
            await Product.destroy({where:{id:id}})
            res.status(200).send({message:'Updated Deleted'})
        }else{
            res.status(404).send({
                message:'Product Not Found'
            })
            throw new Error("Product Not Found")
        }
       
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

module.exports = {
    getAllProducts,
    getAllProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductStock,
    getAllProductsWithoutStock
}