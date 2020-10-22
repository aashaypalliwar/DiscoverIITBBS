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
});

exports.updateBio = catchAsync(async (req, res, next) => {
    //1 create error if password change//
   
    if(req.body.email|| req.body.name){
        return next (new AppError('Sorry you are not allowed to change name and email',401))
    }
  
    const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updateUser,
      },
    });
  });