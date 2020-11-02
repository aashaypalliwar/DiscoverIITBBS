require('dotenv').config();

let PORT = process.env.PORT;
let EMAIL_USERNAME = process.env.EMAIL_USERNAME;
let EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
let NODE_ENV = process.env.NODE_ENV;
let JWT_SECRET = process.env.JWT_SECRET;
let JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
let MONGODB_URI = process.env.MONGODB_URI;
let JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN;
let CLIENT_ID = process.env.CLIENT_ID;
let SIGNUP_TOGGLE = process.env.SIGNUP_TOGGLE;

module.exports = {
  PORT,
  MONGODB_URI,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  JWT_COOKIE_EXPIRES_IN,
  CLIENT_ID,
  SIGNUP_TOGGLE,
};
