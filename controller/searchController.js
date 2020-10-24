const User = require('./../model/dbModel/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.searchUser = catchAsync(async (req, res, next) => {
  console.log(req.params.query);
  // const searchQuery = '"' + req.params.query + '"';
  // console.log(searchQuery);

  const users = await User.find(
    { $text: { $search: req.params.query } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  // console.log(user);

  if (users === null) {
    console.log('here');

    return next(new AppError('There is no user with this email', 404));
  }
  res.status(200).json({
    status: 'success',
    users: users,
  });
});

exports.searchByTag = catchAsync(async (req, res, next) => {
  
});
