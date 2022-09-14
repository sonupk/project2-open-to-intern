const mongoose= require('mongoose')
const internModel = require('../model/internModel')
const collegeModel = require('../model/collageModel')


const createIntern = async function (req,res) {
    try {
        const internData = req.body

        const { name, mobile, email, collegeName} = req.body
        const newIntern = await internModel.create(internData)
        res.status(201).send({status:true, message:"internship successfully created", data:newIntern})
        

    }
    catch(err) {
        return res.status(500).send({status: false, message:"Error" ,error:err.message})
    }
}

module.exports.createIntern=createIntern

