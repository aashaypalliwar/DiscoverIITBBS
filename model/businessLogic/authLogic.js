const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/appError');
const config = require('../../utils/config');
const catchAsync =  require('./../../utils/catchAsync');
const {OAuth2Client} = require('google-auth-library');
const { response } = require('../../app');
const User = require('../dbModel/userModel');

const client = new OAuth2Client(config.CLIENT_ID);
const signToken = id => {
    console.log(config.JWT_EXPIRES_IN)
    return jwt.sign({ id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN
    });
};

//TODO: Modify as per use case.
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const expirationTime = Date.now() + config.JWT_COOKIE_EXPIRES_IN* 24 * 60 * 60 * 1000;

    const cookieOptions = {
        expires: new Date(
            expirationTime
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        status: 'success',
        expiresAfter: expirationTime,
        token,
        data: {
            user
        }
    });
};

//TODO: Rectify the protect function to act as per auth workflow.
const protect = async (req, res, next) => {
  
    try{
        // 1) Getting token and check of it's there
        let token;
        // if (
        //     req.headers.authorization &&
        //     req.headers.authorization.startsWith('Bearer')
        // ) {
        //     token = req.headers.authorization.split(' ')[1];
        // }
        // else 
       
        if(req.cookies.jwt){
              token = req.cookies.jwt;
            }
        console.log(token);
        if (!token) {
            console.log('reached')
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401)
            );
        }
        // console.log(token);
        // 2) Verification token
        const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);

        //The commented code next may not work for our use case.

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
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
       
        next();
    }
    catch(err){
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

const googleLogin = catchAsync(async (req,res,next)=>{
    const {tokenId} = req.body;
    if(!tokenId){
        return next(new AppError('There is no tokenId sent',403));
    }
     
    // verifying tokeId
    client.verifyIdToken({idToken : tokenId , audience : config.CLIENT_ID})
    .then(response=>{
        const {name , email , email_verified} = response.payload;
        // console.log(name , email ,email_verified);
        // console.log(response.payload);
        if(email_verified){
            User.findOne({email}).exec((err,user)=>{
                if(err){
                    return res.status(404).json({
                        message:'something went wrong'
                    })
                }
                else{
                    if(user)createSendToken(user,200,res);
                    else{
                        res.status(200).json({
                            status:'Dont worry user will be created in DB'
                        })
                    }
                }
            })
            
        }
    }).catch(err=>console.log(err));

})

module.exports = {
    signToken,
    createSendToken,
    protect,
    restrictTo,
    googleLogin
};