const User = require('./../model/dbModel/userModel');
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
  const user = req.user;
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
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

exports.publishStatus_to_false = catchAsync(async (req, res, next) => {
  // Making the publishStatus to false by admin //
  const user = await User.findOne({ email: req.params.email }).select(
    '+publishStatus'
  );
  if (!user) {
    return next(
      new AppError('Sorry admin there is no user with this email', 403)
    );
  }

  if (!user.publishStatus) {
    user.publishStatus = false;
    await user.save({ runValidators: false });
    res.status(200).json({
      status: 'success',
      message: 'User has been successfully blacklisted by the admin',
    });
    next();
  }
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  let filter = {};

  req.query = {
    publishStatus: 'true',
  };
  let docs;
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
