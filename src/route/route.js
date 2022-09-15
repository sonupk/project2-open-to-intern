const express=require("express")
const router=express.Router()
const collageController=require('../controllers/collageController')
const internController=require('../controllers/internController')


router.post("/functionup/colleges",collageController.createCollege)// for creating college
router.post("/functionup/interns", internController.createIntern)//creating intern
router.get("/functionup/collegeDetails", internController.geDetails)// for getting all the details of college and intern


module.exports=router