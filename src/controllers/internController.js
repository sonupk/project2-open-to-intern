import collegeModel from '../model/collageModel'
import internModel from '../model/internModel'









const geDetails = async function(req, res){
    let name = req.query.name
    let collegeData = await collegeModel.findOne(name)
    let college_id =collegeData._id
    let internData =await internModel.find({collegeId:college_id}).select({name:1,email:1,mobile:1})

}