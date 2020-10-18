const rateLimit = require('express-rate-limit');
const config = require('./config');

//Define all the limiters.





/*let limit = 20;
if(config.NODE_ENV === 'development')
    limit = 1000;
const limiter = rateLimit({
    max: limit,
    windowMs: config.LIMITER_HOURS * 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again after some time!'
});

const authLimiter = rateLimit({
    max: 10,
    windowMs: config.AUTH_LIMITER_HOURS * 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again after some time!'
});

const guestLimiter = rateLimit({
    max: 15,
    windowMs: config.GUEST_LIMITER_HOURS * 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again after some time!'
});

module.exports = {
    limiter,
    authLimiter,
    guestLimiter
}*/
