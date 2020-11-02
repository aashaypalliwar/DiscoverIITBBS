const User = require('./../model/dbModel/userModel');
const Tag = require('./../model/dbModel/tagModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { sendEmail } = require('../utils/sendEmail');

exports.aboutMe = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError('This user is not present', 401));
  }

  res.status(200).json({
    status: 'suceess',
    data: {
      user: req.user,
    },
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ _id: req.query.id })
    .populate({
      path: 'tags',
      model: 'Tag',
    })
    .lean();

  if (!user) {
    return next(new AppError('This user is not present', 400));
  }
  res.status(200).json({
    status: 'success',
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

  if (!req.user.autoVerify) {
    req.body.verifyStatus = false;
  } else {
    req.body.verifyStatus = true;
  }

  const updateUser = await User.findByIdAndUpdate(req.user._id, req.body, {
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
  const docs = await User.find({ publishStatus: true })
    .select('name email image verifyStatus')
    .sort({ verifyStatus: -1, name: 1 })
    .lean();

  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.getAllTags = catchAsync(async (req, res, next) => {
  const docs = await Tag.find({}).lean();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.reportUser = catchAsync(async (req, res, next) => {
  const reportedUser = await User.findById(req.params.id);

  if (!reportedUser) {
    return next(new AppError('The user to be reported is not present', 400));
  }

  const reportedUser = await User.findById(req.params.id);
  if(!reportedUser){
    return next (new AppError('The user with this id is not present',403));
  }
  
  if(reportedUser.reporters &&reportedUser.reporters.includes(req.user.id)){
    res.status(200).json({
      status: 'success',
      message: 'This user is already reported by you',
    });
  } else {
    const newReportCount = reportedUser.reportCount + 1;
    let publishStatus = true;
    if (newReportCount > 4) {
      publishStatus = false;
      await sendEmail({
        email: reportedUser.email,
        subject: `Your profile has been unpublished.`,
        message: `Hey ${reportedUser.name}, Your profile on the Discovery Portal has been unpublished.\nContact admin for republishing it.`,
        attachments: [],
      });
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      reportCount: newReportCount,
      publishStatus: publishStatus,
      $push: { reporters: req.user._id },
    });

    res.status(200).json({
      status:'Success',
      message:'The user has been successfully reported',
      data : reportedUser
    })
  }
});
