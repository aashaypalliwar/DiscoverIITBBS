const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/appError');
const config = require('../../utils/config');
const catchAsync = require('./../../utils/catchAsync');
const { OAuth2Client } = require('google-auth-library');
const { response } = require('../../app');
const mongoose = require('mongoose');
const User = require('../dbModel/userModel');

const client = new OAuth2Client(config.CLIENT_ID);
const createToken = (id) => {
  const jwtToken = jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });

  return jwtToken;
};
//TODO: Modify as per use case.
const createSendToken = (user, statusCode, res) => {
  try {
    // console.log(user);
    const token = createToken(user._id);
    // console.log(token);
    // sending a cookie to the browser which stores the jwt token//
    const cookieOptions = {
      expires: new Date(
        Date.now() + config.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (config.NODE_ENV === 'production') {
      cookieOptions.secure = true;
    }

    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
      status: 'success',
      verification: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

//TODO: Rectify the protect function to act as per auth workflow.
const protect = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    // console.log(req.cookies.jwt);

    if (!token) {
      console.log('reached');
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
    // console.log(token);
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);

    //The commented code next may not work for our use case.

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id).populate({
      path: 'Tags',
      model: 'Tag',
      select: 'name',
    });
    // console.log(currentUser);
    // console.log(currentUser);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    // if (currentUser.blacklisted === true) {
    //     return next(
    //         new AppError(
    //             'Forbidden. Please contact admin for more information.',
    //             401
    //         )
    //     );
    // }
    req.user = currentUser;
    // console.log(req.user);
    next();
  } catch (err) {
    next(err);
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
const createUser = catchAsync(async (name, email, res) => {
  //  console.log(name,email);
  const newUser = await User.create({
    name: name,
    email: email,
    image: `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}`,
  });
  createSendToken(newUser, 200, res);
});

const googleLogin = catchAsync(async (req, res, next) => {
  const { tokenId } = req.body;
  if (!tokenId) {
    return next(new AppError('There is no tokenId sent', 403));
  }

  // // verifying tokeId
  client
    .verifyIdToken({ idToken: tokenId, audience: config.CLIENT_ID })
    .then((response) => {
      const { name, email, email_verified } = response.payload;
      // console.log(name , email ,email_verified);
      console.log('response.payload');
      console.log(response.payload);
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(404).json({
              message: err.message,
            });
          } else {
            console.log('verified');
            if (user) {
              createSendToken(user, 200, res);
            } else {
              createUser(name, email, res);
            }
          }
        });
      }
    })
    .catch((err) => console.log(err));
});

const logout = (req, res, next) => {
  // // console.log(req.cookies.jwt);
  // console.log(document.cookie);
  // // console.log(req.cookies.jwt);

  res.clearCookie('jwt', {
    path: '/',
  });
  res.status(200).json({
    status: 'success',
    message: 'logged out',
  });
};

module.exports = {
  createToken,
  createSendToken,
  protect,
  restrictTo,
  googleLogin,
  logout,
};
