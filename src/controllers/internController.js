const mongoose= require('mongoose')
const internModel = require('../model/internModel')
const collegeModel = require('../model/collageModel')
const validator = require ("validator")


function checkPhoneNumber (str){
    var re = /"^[0-9]{10}$"/;
    return re.test(str)
}


const createIntern = async function (req,res) {
    try {
        const internData = req.body
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
        if (!findEmail.length > 0){
            return res.status(400).send({status : false, message :"email is aldready taken"})
        }
        
        // --------------------for phone validation----------------
        if (!internData.mobile){
            return res.status(400).send({status : false, message : "required mobileNumber"})
        }
        
        if (!checkPhoneNumber (internData.mobile.trim())){
            return res.status(400).send({status : false, message : "phone number is invalid"})
        }

        const findMobile = await internModel.find({mobile : internData.mobile})
        if (!findMobile.length > 0){
            return res.status(400).send({status : false, message :"mobileNumber is aldready taken"})
        }

        const { name, mobile, email, collegeName} = req.body
        const newIntern = await internModel.create(internData)
        res.status(201).send({status:true, message:"internship successfully created", data:newIntern})
        

    }
    catch(err) {
        return res.status(500).send({status: false, message:"Error" ,error:err.message})
    }
}


const geDetails = async function(req, res){
    try{    
        let name = req.query.name
        let collegeData = await collegeModel.findOne(name)
        let college_id =collegeData._id
        let internData =await internModel.find({collegeId:college_id}).select({name:1,email:1,mobile:1})
        
        res.status(200).send({staus:true, name:collegeData.name,fullName:collegeData.fullName,logoLink:collegeData.logoLink,interns:internData})
        
        }catch(err){
            res.status(400).send({status:false, error:err.message})
        }
    }
    
    
    module.exports.geDetails=geDetails
    module.exports.createIntern=createIntern