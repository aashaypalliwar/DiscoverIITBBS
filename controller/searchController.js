const User = require('./../model/dbModel/userModel');
const Tag = require('./../model/dbModel/tagModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.searchUser = catchAsync(async (req, res, next) => {
  console.log(req.params.query);
  let searchQuery = req.params.query;
  searchQuery = new RegExp(
    searchQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
    'gi'
  );
  // const searchQuery = '\\' + req.params.query + '\\g';
  // console.log(searchQuery);

  const users = User.find({ name: searchQuery });

  // console.log(user);

  if (users.length == 0) {
    console.log('here');

    return next(new AppError('There is no user with this email', 404));
  }
  res.status(200).json({
    status: 'success',
    users: users,
  });
});

exports.searchByTag = catchAsync(async (req, res, next) => {
  const queryTags = req.body.tagsSelected;

  const users = await User.find({ tags: { $all: queryTags } })
    .sort({ verifyStatus: -1 })
    .populate({
      path: 'tags',
      model: 'Tag',
      select: 'name',
    });

  // if (users.length == 0) {
  //   return next(
  //     new AppError('Sorry there are no users with all these tags', 401)
  //   );
  // }
  res.status(200).json({
    status: 'success',
    data: {
      users},
  });
});
