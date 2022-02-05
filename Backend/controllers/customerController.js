const db = require('../models/index')

const Customer = db.customer
const Sale = db.sale

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).send(customers)
    } catch (error) {
        console.log(error);
    }
}

const getCustomerById = async (req, res) => {
    try {
        const id = req.params.id
        const customer = await Customer.findOne({where:{id:id}})
        if(customer){
            res.status(200).send(customer)
        }else{
            res.status(404).send({
                message:'Customer Not Found'
            })
            throw new Error("Customer Not Found")
        }
        
    } catch (error) {
        console.log(error);
    }
}

const getCustomerSales = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Customer.findOne({
            include:[{
                model:Sale,
                as:'sale'
            }],
            where:{id:id}
        })
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send({
                message:'Customer Not Found'
            })
            throw new Error("Customer Not Found")
        }
        
    } catch (error) {
        console.log(error);
    }
}


const addCustomer = async (req, res) => {
    
    const data = {
        name:req.body.name,
        phone: req.body.phone
    }

    try {
        const customer = await Customer.create(data)
        res.status(201).send(customer)
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const updateCustomer = async (req, res) => {
    try {
        const id = req.params.id
        const customer = await Customer.findOne({where:{id:id}})
        
        if(customer){
            await Customer.update(req.body,{where:{id:id}})
            res.status(200).send({message:'Updated Successfully'})
        }else{
            res.status(404).send({
                message:'Customer Not Found'
            })
            throw new Error("Customer Not Found")
        }
       
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id
        const customer = await Customer.findOne({where:{id:id}})
        
        if(customer){
            await Customer.destroy({where:{id:id}})
            res.status(200).send({message:'Updated Deleted'})
        }else{
            res.status(404).send({
                message:'Customer Not Found'
            })
            throw new Error("Customer Not Found")
        }
       
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

module.exports = {getAllCustomers,addCustomer,getCustomerById,updateCustomer,deleteCustomer,getCustomerSales}