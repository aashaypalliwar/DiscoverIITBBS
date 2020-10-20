const User = require('./../model/dbModel/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.searchUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email });

  console.log(user);

  if (user === null) {
    console.log('here');

    return next(new AppError('There is no user with this email', 404));
  }
  res.status(200).json({
    status: 'success',
    user: user,
  });
});
