const User = require('../model/dbModel/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Tag = require('../model/dbModel/tagModel');
const { sendEmail } = require('../utils/sendEmail');

exports.unpublish = catchAsync(async (req, res, next) => {
  const emails_to_unpublish = req.body.emails;

  if (!emails_to_unpublish || emails_to_unpublish == []) {
    return next(new AppError('There are no emails in the request', 400));
  }

  // Updating
  await User.updateMany(
    {
      email: { $in: emails_to_unpublish },
    },
    { $set: { publishStatus: false } }
  ).catch((err) => console.log(err));

  //Getting the updated documents
  const updatedDocument = await User.find({
    email: { $in: emails_to_unpublish },
  });

  //Success and Failure email arrays
  unpublish_failed_user_emails = [];
  unpublish_success_user_emails = [];

  for (let user of updatedDocument) {
    if (user.publishStatus) unpublish_failed_user_emails.push(user.email);
    else unpublish_success_user_emails.push(user.email);
  }

  await sendEmail({
    email: unpublish_success_user_emails,
    subject: `Your profile has been unpublished.`,
    message: `Greetings! Your profile on the Discovery Portal has been unpublished.\nContact admin for republishing it.`,
    attachments: [],
  });

  if (unpublish_failed_user_emails.length === 0) {
    res.status(200).json({
      status: 'success',
    });
  } else {
    res.status(200).json({
      unpublish_failed_users: unpublish_failed_user_emails,
    });
  }
});

exports.publish = catchAsync(async (req, res, next) => {
  const emails_to_publish = req.body.emails;

  if (!emails_to_publish || emails_to_publish == []) {
    return next(new AppError('There are no emails in the request', 400));
  }

  //Updating
  await User.updateMany(
    {
      email: { $in: emails_to_publish },
    },
    { $set: { publishStatus: true } }
  ).catch((err) => console.log(err));

  // Getting Updated documents
  const updatedDocument = await User.find({
    email: { $in: emails_to_publish },
  });

  //Success and Failure arrays
  publish_failed_user_emails = [];
  publish_success_user_emails = [];

  for (let user of updatedDocument) {
    if (user.publishStatus) publish_success_user_emails.push(user.email);
    else publish_failed_user_emails.push(user.email);
  }

  await sendEmail({
    email: publish_success_user_emails,
    subject: `Your profile has been published again.`,
    message: `Greetings! Your profile on the Discovery Portal has been republished.\nContact admin for more details.`,
    attachments: [],
  });

  if (publish_failed_user_emails.length === 0) {
    res.status(200).json({
      status: 'success',
    });
  } else {
    res.status(200).json({
      publish_failed: publish_failed_user_emails,
    });
  }
});

exports.unverify = catchAsync(async (req, res, next) => {
  const emails_to_unverify = req.body.emails;
  if (!emails_to_unverify) {
    return next(new AppError('There are no emails in the request', 400));
  }

  await User.updateMany(
    {
      email: { $in: emails_to_unverify },
    },
    { $set: { verifyStatus: false, autoVerify: false } }
  ).catch((err) => console.log(err));

  const updatedDocument = await User.find({
    email: { $in: emails_to_unverify },
  });
  // console.log(updatedUsers);
  unverify_failed_user_emails = [];
  unverify_success_user_emails = [];

  for (let user of updatedDocument) {
    if (user.verifyStatus) unverify_failed_user_emails.push(user.email);
    else unverify_success_user_emails.push(user.email);
  }

  if (unverify_failed_user_emails.length === 0) {
    res.status(200).json({
      status: 'success',
    });
  } else {
    res.status(200).json({
      unverify_failed: unverify_failed_user_emails,
    });
  }
});

exports.verify = catchAsync(async (req, res, next) => {
  const emails_to_verify = req.body.emails;
  if (!emails_to_verify) {
    return next(new AppError('There are no emails in the request', 401));
  }

  await User.updateMany(
    {
      email: { $in: emails_to_verify },
    },
    { $set: { verifyStatus: true } }
  ).catch((err) => console.log(err));

  const updatedDocument = await User.find({ email: { $in: emails_to_verify } });
  verify_failed_user_emails = [];
  verify_success_user_emails = [];

  for (let user of updatedDocument) {
    if (user.verifyStatus) verify_success_user_emails.push(user.email);
    else verify_failed_user_emails.push(user.email);
  }

  if (verify_failed_user_emails.length === 0) {
    res.status(200).json({
      status: 'success',
    });
  } else {
    res.status(200).json({
      verify_failed: verify_failed_user_emails,
    });
  }
});

exports.createTag = catchAsync(async (req, res, next) => {
  const { tagName, tagGroup } = req.body.tag;

  if (!tagName || !tagGroup) {
    return next(new AppError('Either name or group of tag is missing', 400));
  }
  const newTag = await Tag.create({
    name: tagName,
    group: tagGroup,
  });
  if (!newTag) {
    return next(new AppError('A problem occurred while creating the tag', 500));
  }
  res.status(200).json({
    status: 'success',
    tag: newTag,
  });
});

exports.deleteTag = catchAsync(async (req, res, next) => {
  const tagId = req.params.id;
  if (!tagId) {
    return next(new AppError('There is no tag id mentioned', 400));
  }

  const deletedDocument = await Tag.findByIdAndDelete(tagId);
  if (!deletedDocument)
    return next(new AppError('No document found with this id', 400));

  res.status(200).json({
    status: 'success',
  });
});

exports.autoVerify = catchAsync(async (req, res, next) => {
  const emails_to_autoVerify = req.body.emails;
  if (!emails_to_autoVerify) {
    return next(new AppError('There are no emails in the request', 401));
  }

  await User.updateMany(
    {
      email: { $in: emails_to_autoVerify },
    },
    { $set: { autoVerifyStatus: true } }
  ).catch((err) => console.log(err));

  const updatedDocument = await User.find({
    email: { $in: emails_to_autoVerify },
  });

  autoVerify_failed_user_emails = [];
  autoVerify_success_user_emails = [];

  for (let user of updatedDocument) {
    if (user.autoVerifyStatus) autoVerify_success_user_emails.push(user.email);
    else autoVerify_failed_user_emails.push(user.email);
  }

  if (autoVerify_failed_user_emails.length === 0) {
    res.status(200).json({
      status: 'success',
    });
  } else {
    res.status(200).json({
      autoVerify_failed: autoVerify_failed_user_emails,
    });
  }
});

exports.getAllUnpublishedUsers = catchAsync(async (req, res, next) => {
  const docs = await User.find({ publishStatus: false })
    .select('name email image verifyStatus')
    .sort({ verifyStatus: -1, name: 1 })
    .lean();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.getAllReportedUsers = catchAsync(async (req, res, next) => {
  const docs = await User.find({ reportCount: { $gt: 0 } })
    .populate({
      path: 'reporters',
      model: 'User',
      select: 'name email',
    })
    .lean();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.updateTag = catchAsync(async (req, res, next) => {
  const tagId = req.params.id;
  if (!tagId) {
    return next(new AppError('There is no tag id mentioned', 400));
  }

  const tag = await Tag.findByIdAndUpdate(tagId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      tag: tag,
    },
  });
});
