const collegeModel= require('../model/collegeModel')


//--------------------College Creation--------------------------------------
const createCollege =async function (req,res) {
    try {
        const collegeData = req.body

        //--------------query not allowed validation------------
        if (Object.keys(req.query) != 0)
        return res.status(400).send({ status: false, message: "Do not provide any filter !!" })


        //----------------match validation---------------------
        let comp =["name", "fullName", "logoLink", "isDeleted"]
        if(!Object.keys(collegeData).every(ele=>comp.includes(ele)))
        return res.status(400).send({status:false, message:'Invalid fields in College'})
       
        //--------------if body is empty------------------------
        if (Object.keys(collegeData).length < 1){
        return res.status (400).send({status : false, message : "Bad request"})
        }
       
        //-------------Abbreviation Validation-----------------
        if (!collegeData.name){
        return res.status (400).send({status: false, message : "required name"})
        }
        if (!(/^[a-zA-Z ]{3,6}$/).test(collegeData.name))
        return res.status(400).send({status:false, message:'Only alphabets in Name!!'})

        //------------------fullName Validation--------------------
        if (!collegeData.fullName){
        return res.status (400).send({status : false, message: "required fullName"})
        }
        if (!(/^[a-zA-Z ,-]{5,}$/).test(collegeData.fullName))
        return res.status(400).send({status:false, message:'Only alphabets in collegeName!!'})
        
        //----------------validation for logo link----------------------------
        if (!collegeData.logoLink){
        return res.status(400).send({status : false, msg : "required logoLink"})
        }

        if (!(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/).test(collegeData.logoLink))
        return res.status(400).send({status:false, message:'Invalid logo url link !!'})
       
        
        //-----------------checking for duplicate data------------------------
        if(await collegeModel.findOne({name:collegeData.name}))
        return res.status(400).send({status:false, message:'Data is already present in Database'})
        
        //--------------------creating college documents-------------------------
        const newCollege = await collegeModel.create(collegeData)
        
        return res.status(201).send({ status: true, message: "College created succesfully.", data: newCollege })

    }
    catch (err) {
        // -----------------------internal server error------------------------------
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}


module.exports.createCollege=createCollege

