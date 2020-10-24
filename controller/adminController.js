const User = require('../model/dbModel/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.depublish = catchAsync(async(req,res,next)=>{
   
    const emails_to_depublish = req.body.emails;
    console.log(emails_to_depublish);
    if(!emails_to_depublish){
        return next(new AppError('There are no emails in the request',401));
    }

    const users = await User.updateMany({email : {$in : emails_to_depublish}},{$set : {publishStatus : false}}).select('+email').catch(err=>console.log(err));
    // console.log(users);
    res.status(200).json({
        status:'success',
        data : users
    });


})