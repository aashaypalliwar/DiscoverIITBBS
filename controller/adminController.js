const User = require('../model/dbModel/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const { sendEmail } = require('../utils/sendEmail');

exports.unpublish = catchAsync(async (req, res, next) => {
  const emails_to_depublish = req.body.emails;
  // console.log(emails_to_depublish);

  if (!emails_to_depublish) {
    return next(new AppError('There are no emails in the request', 401));
  }

  // Restriction for depublishing
  roles = ['user', 'admin'];
  if (req.user.role === 'superAdmin') {
    roles.push('superAdmin');
  }

  // Updating
  const updatedResponse = await User.updateMany(
    {
      email: { $in: emails_to_depublish },
      role: { $in: roles },
      publishStatus: { $eq: true },
    },
    { $set: { publishStatus: false } }
  ).catch((err) => console.log(err));

  //Getting the updated documents
  const updatedDocument = await User.find({
    email: { $in: emails_to_depublish },
  });
  // console.log(updatedUsers);

  //Success and Failure email arrays
  unpublish_failed_user_emails = [];
  unpublish_success_user_emails = [];

  for (let user of updatedDocument) {
    if (user.publishStatus) unpublish_failed_user_emails.push(user.email);
    else unpublish_success_user_emails.push(user.email);
  }

  try {
    // Sending email to users
    // await sendEmail({
    //     email : unpublish_success_user_emails,
    //     subject : "From Discovery Portal",
    //     message : "You are unpublished by the superAdmin",

    // });

    if (unpublish_failed_user_emails.length === 0) {
      res.status(200).json({
        status: 'success',
      });
    } else {
      res.status(200).json({
        unpublish_failed_users: unpublish_failed_user_emails,
      });
    }
  } catch (err) {
    return next(new AppError('Error sending mail to the user', 401));
  }
});

exports.publish = catchAsync(async (req, res, next) => {
  const emails_to_publish = req.body.emails;
  // console.log(emails_to_publish);

  if (!emails_to_publish) {
    return next(new AppError('There are no emails in the request', 401));
  }
  //Updating
  const updatedResponse = await User.updateMany(
    {
      email: { $in: emails_to_publish },
      role: { $in: ['user', 'admin'] },
      publishStatus: { $eq: false },
    },
    { $set: { publishStatus: true } }
  ).catch((err) => console.log(err));

  // Getting Updated documents
  const updatedDocument = await User.find({
    email: { $in: emails_to_publish },
  });
  // console.log(updatedUsers);

  //Success and Failure arrays
  publish_failed_user_emails = [];
  publish_success_user_emails = [];

  for (let user of updatedDocument) {
    if (user.publishStatus) publish_success_user_emails.push(user.email);
    else publish_failed_user_emails.push(user.email);
  }

  try {
    // await sendEmail({
    //    email : pubish_success_user_emails,
    //    subject : "From Discovery Portal",
    //    message : "You are published by the superAdmin",

    //  });

    if (publish_failed_user_emails.length === 0) {
      res.status(200).json({
        status: 'success',
      });
    } else {
      res.status(200).json({
        publish_failed: publish_failed_user_emails,
      });
    }
  } catch (err) {
    return next(new AppError('Error sending mail to the user', 401));
  }
});

exports.unverify = catchAsync(async (req, res, next) => {
  const emails_to_unverify = req.body.emails;
  // console.log(emails_to_);
  if (!emails_to_unverify) {
    return next(new AppError('There are no emails in the request', 401));
  }

  //Restriction
  roles = ['user', 'admin'];
  if (req.user.role === 'superAdmin') {
    roles.push('superAdmin');
  }
  const updatedResponse = await User.updateMany(
    {
      email: { $in: emails_to_unverify },
      role: { $in: roles },
      verifyStatus: { $eq: true },
    },
    { $set: { verifyStatus: false } }
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

  try {
    // await sendEmail({
    //     email : unverify_success_user_emails,
    //     subject : "From Discovery Portal",
    //     message : "You are published by the superAdmin",

    //   });

    if (unverify_failed_user_emails.length === 0) {
      res.status(200).json({
        status: 'success',
      });
    } else {
      res.status(200).json({
        unverify_failed: unverify_failed_user_emails,
      });
    }
  } catch (err) {
    return next(new AppError('Error in sending the mail', 401));
  }
});

exports.verify = catchAsync(async (req, res, next) => {
  const emails_to_verify = req.body.emails;
  // console.log(emails_to_verify);
  if (!emails_to_verify) {
    return next(new AppError('There are no emails in the request', 401));
  }
  roles = ['user', 'admin'];
  if (req.user.role === 'superAdmin') {
    roles.push('superAdmin');
  }
  const updatedResponse = await User.updateMany(
    {
      email: { $in: emails_to_verify },
      role: { $in: roles },
      verifyStatus: { $eq: false },
    },
    { $set: { verifyStatus: true } }
  ).catch((err) => console.log(err));

  const updatedDocument = await User.find({ email: { $in: emails_to_verify } });
  // console.log(updatedUsers);
  verify_failed_user_emails = [];
  verify_success_user_emails = [];

  for (let user of updatedDocument) {
    if (user.verifyStatus) verify_success_user_emails.push(user.email);
    else verify_failed_user_emails.push(user.email);
  }

  try {
    // await sendEmail({
    //     email : verify_success_user_emails,
    //     subject : "From Discovery Portal",
    //     message : "You are published by the superAdmin",

    //   });

    if (verify_failed_user_emails.length === 0) {
      res.status(200).json({
        status: 'success',
      });
    } else {
      res.status(200).json({
        verify_failed: verify_failed_user_emails,
      });
    }
  } catch (err) {
    return next(new AppError('Error in sending the mail', 401));
  }
});
