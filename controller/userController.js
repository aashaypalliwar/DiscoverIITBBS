const User = require('./../model/dbModel/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.aboutMe = catchAsync(async(req,res,next)=>{
//  Through protect function in auth logic we get the user in req
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

exports.verification_to_false = catchAsync(async(req,res,next)=>{
    // Making the verification to false by admin //
    const user = await User.findOne({email:req.params.email}).select('+Verification');
    if(!user){
        return next(new AppError('Sorry admin there is no user with this email',403));
    }

    if(!user.Verification){
        user.Verification = false;
        await user.save({runValidators:false});
        res.status(200).json({
            status: 'success',
            message: 'User has been successfully blacklisted by the admin',
          });
          next();
    }

  });

  exports.getAllUsers = catchAsync(async(req,res,next)=>{
    let filter = {};
    
    req.query = {
      Verification:'true'
    };
    let docs;
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    docs = await features.query; // explain()

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs,
      },
    });

  })
