const mongoose= require('mongoose')
const collageModel= require('../model/collageModel')
const internModel =require('../model/internModel')

const createCollege =async function (req,res) {
    try {
        const collegeData = req.body
       
       const { name, fullName, logoLink } = collegeData

        //creating college documents-------------
        const newCollege = await collageModel.create(collegeData)
        console.log(newCollege)
        res.status(201).send({ status: true, message: "College created succesfully.", data: newCollege })

    }
    catch (err) {
        // internal server error
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}
module.exports.createCollege=createCollege

