const mongoose= require('mongoose')
const collageModel= require('../model/collageModel')
const internModel =require('../model/internModel')



const createCollege =async function (req,res) {
    try {
        const collegeData = req.body
        if (Object.keys(collegeData).length < 1){
            return res.status (400).send({status : false, message : "Bad request"})
        }

        if (!collegeData.name){
            return res.status (400).send({status: false, message : "required name"})
        }

        if (!collegeData.fullName){
            return res.status (400).send({status : false, message: "required fullName"})
        }

        if (!collegeData.logoLink){
            return res.status(400).send({status : false, msg : "required logoLink"})
        }
       
       const { name, fullName, logoLink } = collegeData

        //creating college documents-------------
        const newCollege = await collageModel.create(collegeData)
        res.status(201).send({ status: true, message: "College created succesfully.", data: newCollege })

    }
    catch (err) {
        // internal server error
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}
module.exports.createCollege=createCollege

