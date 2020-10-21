const User = require('./../model/dbModel/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.aboutMe = catchAsync(async(req,res,next)=>{

    const user = req.user;
    if(!user){
        return next(new AppError('This user is not present',401));
    }

    res.status(200).json({
        status:'suceess',
        data:{
            user
        }
    })
})