const User = require('./../model/dbModel/userModel');
const Tag = require('./../model/dbModel/tagModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

function filterObj(obj, ...allowedFields) {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}


exports.aboutMe = catchAsync(async (req, res, next) => {
  //  Through protect function in auth logic we get the user in req
  console.log(req.user.id);
  const user = await  User.findById(req.user.id).populate({
    path: 'tags',
    model: 'Tag',
    select: 'name group',
  });
  
  if (!user) {
    return next(new AppError('This user is not present', 401));
  }

  res.status(200).json({
    status: 'suceess',
    data: {
      user,
    },
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  if (req.body.email || req.body.name) {
    return next(
      new AppError('Sorry you are not allowed to change name and email', 401)
    );
  }

  const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  }).populate({
    path: 'tags',
    model: 'Tag',
    select: 'name group',
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});



exports.getAllUsers = catchAsync(async (req, res, next) => {
  let filter = {role:'user'};
  
  let docs;
  // const users = await User.find({role:{$eq:'user'}})
  req.query.sort = 'name';
  const features = new APIFeatures(User.find(filter), req.query)
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
});


exports.getAllTags = catchAsync(async(req,res,next)=>{
  let filter={};
  let docs;
  // const users = await User.find({role:{$eq:'user'}})
  req.query.sort = 'group';
  const features = new APIFeatures(Tag.find(filter), req.query)
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
});
