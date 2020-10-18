const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/appError');
const config = require('../../utils/config');

const signToken = id => {
    console.log(config.JWT_EXPIRES_IN)
    return jwt.sign({ id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN
    }, { algorithm: 'HS256'});
};

//TODO: Modify as per use case.
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const expirationTime = Date.now() + config.JWT_EXPIRES_IN;

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
        if(!(req.cookies.jwt))
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401)
            );
        token = req.cookies.jwt;


        if (!token) {
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401)
            );
        }

        // 2) Verification token
        const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);

        //The commented code next may not work for our use case.

        // 3) Check if user still exists
        /*const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next(
                new AppError(
                    'The user belonging to this token does no longer exist.',
                    401
                )
            );
        }

        if (currentUser.blacklisted === true) {
            return next(
                new AppError(
                    'Forbidden. Please contact admin for more information.',
                    401
                )
            );
        }
        req.user = currentUser;*/
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

module.exports = {
    signToken,
    createSendToken,
    protect,
    restrictTo
};