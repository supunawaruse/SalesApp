const db = require('../models/index')

const Supplier = db.supplier

const getAllSuppliers = async (req, res) => {
    try {
        const supplier = await Supplier.findAll();
        res.status(200).send(supplier)
    } catch (error) {
        console.log(error);
    }
}

const getSupplierById = async (req, res) => {
    try {
        const id = req.params.id
        const supplier = await Supplier.findOne({where:{id:id}})
        if(supplier){
            res.status(200).send(supplier)
        }else{
            res.status(404).send({
                message:'Supplier Not Found'
            })
            throw new Error("Supplier Not Found")
        }
        
    } catch (error) {
        console.log(error);
    }
}


const addSupplier = async (req, res) => {
    
    const data = {
        name:req.body.name,
        phone: req.body.phone,
        location:req.body.location
    }

    try {
        const supplier = await Supplier.create(data)
        res.status(201).send(supplier)
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const updateSupplier = async (req, res) => {
    try {
        const id = req.params.id
        const supplier = await Supplier.findOne({where:{id:id}})
        
        if(supplier){
            await Supplier.update(req.body,{where:{id:id}})
            res.status(200).send({message:'Updated Successfully'})
        }else{
            res.status(404).send({
                message:'Supplier Not Found'
            })
            throw new Error("Supplier Not Found")
        }
       
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const deleteSupplier = async (req, res) => {
    try {
        const id = req.params.id
        const supplier = await Supplier.findOne({where:{id:id}})
        
        if(supplier){
            await Supplier.destroy({where:{id:id}})
            res.status(200).send({message:'Updated Deleted'})
        }else{
            res.status(404).send({
                message:'Supplier Not Found'
            })
            throw new Error("Supplier Not Found")
        }
       
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

module.exports = {getAllSuppliers,addSupplier,getSupplierById,deleteSupplier,updateSupplier}