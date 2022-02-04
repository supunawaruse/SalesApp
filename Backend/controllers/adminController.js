const db = require('../models/index')

const Admin = db.admins

const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).send(admins)
    } catch (error) {
        console.log(error);
    }
}

const getAdminById = async (req, res) => {
    try {
        const id = req.params.id
        const admin = await Admin.findOne({where:{id:id}})
        if(admin){
            res.status(200).send(admin)
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


const addAdmin = async (req, res) => {
    
    const data = {
        name:req.body.name,
        phone: req.body.phone
    }

    try {
        const admin = await Admin.create(data)
        res.status(201).send(admin)
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const updateAdmin = async (req, res) => {
    try {
        const id = req.params.id
        const admin = await Admin.findOne({where:{id:id}})
        
        if(admin){
            await Admin.update(req.body,{where:{id:id}})
            res.status(200).send({message:'Updated Successfully'})
        }else{
            res.status(404).send({
                message:'Admin Not Found'
            })
            throw new Error("Admin Not Found")
        }
       
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const id = req.params.id
        const admin = await Admin.findOne({where:{id:id}})
        
        if(admin){
            await Admin.destroy({where:{id:id}})
            res.status(200).send({message:'Updated Deleted'})
        }else{
            res.status(404).send({
                message:'Admin Not Found'
            })
            throw new Error("Admin Not Found")
        }
       
    } catch (error) {
        res.send(400).send({message:'This is an error'})
        console.log(error);
    }
}

module.exports = {getAllAdmins,addAdmin,getAdminById,updateAdmin,deleteAdmin}