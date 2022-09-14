const mongoose= require('mongoose')
const internModel = require('../model/internModel')
const collegeModel = require('../model/collageModel')
const validator = require ("validator")



const createIntern = async function (req,res) {
    try {
        const internData = req.body
        const { name, mobile, email, collegeName} = internData
        
        if (Object.keys(internData).length < 1){
            return res.status (400).send({status : false, message : "Bad request"})
        }

        if (!internData.name){
            return res.status (400).send({status: false, message : "required name"})
        }
// -----------------for email validation------------------
        if (!internData.email){
            return res.status (400).send({status : false, message: "required email"})
        }

        if (!validator.isEmail(internData.email.trim())){
            return res.status(400).send({status : false, message : "required valid email"})
        }

        const findEmail = await internModel.find({email : internData.email})
        console.log(internData.email);
        if (findEmail.length > 0){
            return res.status(400).send({status : false, message :"email is aldready taken"})
        }
        
        // --------------------for phone validation----------------
        if (!internData.mobile){
            return res.status(400).send({status : false, message : "required mobile Number"})
        }
        
        if (internData.mobile.length < 10 || internData.mobile.length >= 11){
            return res.status(400).send({status : false, message : "mobile number is invalid"})
        }

        const findMobile = await internModel.find({mobile : internData.mobile})
        if (findMobile.length > 0){
            return res.status(400).send({status : false, message :"mobile Number is aldready taken"})
        }

        

        let collegeDetails = await collegeModel.findOne({name:collegeName})
        console.log(collegeDetails)
        let collegeId = collegeDetails._id
        let newData ={name,mobile,email,collegeId}
        const newIntern = await internModel.create(newData)
        res.status(201).send({status:true, message:"internship successfully created", data:newIntern})
        

    }
    catch(err) {
        return res.status(500).send({status: false, message:"Error" ,error:err.message})
    }
}


const geDetails = async function(req, res){
    try{    
        let name = req.query.name
        console.log(name)
        let collegeData = await collegeModel.findOne({name:name})
        console.log(collegeData)
        let college_id =collegeData._id
        let internData =await internModel.find({collegeId:college_id}).select({name:1,email:1,mobile:1})
        
        res.status(200).send({staus:true, name:collegeData.name,fullName:collegeData.fullName,logoLink:collegeData.logoLink,interns:internData})
        
        }catch(err){
            res.status(400).send({status:false, error:err.message})
        }
    }
    
    
    module.exports.geDetails=geDetails
    module.exports.createIntern=createIntern