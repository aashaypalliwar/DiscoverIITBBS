class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    // console.log('line 8');
    Error.captureStackTrace(this, this.constructor);
    // console.log('line 10');
  }
}
module.exports = AppError;
