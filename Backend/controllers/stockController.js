const db = require('../models/index')

const Stock = db.stock
const Product = db.product

const getAllStocks = async (req, res) => {
    try {
        const stock = await Stock.findAll({
            include:[{
                model:Product,
                as:'product'
            }],
        });
        res.status(200).send(stock)
    } catch (error) {
        console.log(error);
    }
}

const getStockByProductId = async (req, res) => {
    try {
        
        const id = req.params.id
        const data = await Stock.findAll({
            include:[{
                model:Product,
                as:'product'
            }],
            where:{product_id:id}
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

const getStockById = async (req, res) => {
    try {
        const id = req.params.id
        const stock = await Stock.findOne({where:{id:id}})
        if(stock){
            res.status(200).send(stock)
        }else{
            res.status(404).send({
                message:'Stock Not Found'
            })
            throw new Error("Stock Not Found")
        }
        
    } catch (error) {
        console.log(error);
    }
}


const addStock = async (req, res) => {
    
    const data = {
        stockQuantity: req.body.stockQuantity,
        product_id:req.body.product_id
    }

    try {
        const stk = await Stock.findOne({where:{product_id:data.product_id}})
        if(stk){
            const newStockValue = parseInt(stk.dataValues.stockQuantity) + parseInt(req.body.stockQuantity)
            await stk.update({stockQuantity:newStockValue})
        }else{
            await Stock.create(data)
        }
        res.status(201).send({Message:"Add to stock"})
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const reduceStock = async (req, res) => {
    
    const data = {
        quantity: req.body.quantity,
        product_id:req.body.product_id
    }

    try {
        const stk = await Stock.findOne({where:{product_id:data.product_id}})
        if(stk){
            const newStockValue = parseInt(stk.dataValues.stockQuantity) - parseInt(req.body.quantity)
            await stk.update({stockQuantity:newStockValue})
        }else{
            console.log('No stock to reduce')
        }
        res.status(201).send({Message:"Reduced from stock"})
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const updateStock = async (req, res) => {
    try {
        const id = req.params.id
        const stock = await Stock.findOne({where:{id:id}})
        
        if(stock){
            await Stock.update(req.body,{where:{id:id}})
            res.status(200).send({message:'Updated Successfully'})
        }else{
            res.status(404).send({
                message:'Stock Not Found'
            })
            throw new Error("Stock Not Found")
        }
       
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const deleteStock = async (req, res) => {
    try {
        const id = req.params.id
        const stock = await Stock.findOne({where:{id:id}})
        
        if(stock){
            await Stock.destroy({where:{id:id}})
            res.status(200).send({message:'Updated Deleted'})
        }else{
            res.status(404).send({
                message:'Stock Not Found'
            })
            throw new Error("Stock Not Found")
        }
       
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

module.exports = {getAllStocks,addStock,getStockById,updateStock,deleteStock,getStockByProductId,reduceStock}