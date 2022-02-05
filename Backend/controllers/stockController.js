const db = require('../models/index')

const Stock = db.stock

const getAllStocks = async (req, res) => {
    try {
        const stock = await Stock.findAll();
        res.status(200).send(stock)
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
        stockPlace:req.body.stockPlace,
        stockQuantity: req.body.stockQuantity,
        product_id:req.body.product_id
    }

    try {
        const stock = await Stock.create(data)
        res.status(201).send(stock)
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

module.exports = {getAllStocks,addStock,getStockById,updateStock,deleteStock}