const express=require("express")
const router=express.Router()
const collageController=require('../controllers/collageController')
const internController=require('../controllers/internController')


router.post("/functionup/colleges",collageController.createCollege)// for creating college
router.post("/functionup/interns", internController.createIntern)
router.get("/functionup/collegeDetails", internController.geDetails)


module.exports=router