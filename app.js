const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');

const middleware = require('./utils/middleware');
const clientEndpoints = ['home', 'profile'];
const searchRouter = require('./routes/searchRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const adminRouter = require('./routes/adminRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
require('./cronJobs/backup');

const app = express();

app.use(helmet());
// app.use(cors());
// app.options('*', cors());
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);
app.use(xss());
app.use(cookieParser());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
//Implement Rate limiters

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS

app.use(middleware.requestLogger);

app.use(express.static(path.join(__dirname, 'portal/build')));

app.get('/', (req, res, next) => {
  if (clientEndpoints.includes(req.params.clientEndpoint)) {
    res.sendFile(path.join(__dirname, '/portal/public/index.html'));
  } else {
    next();
  }
});
app.get('/:clientEndpoint', (req, res, next) => {
  if (clientEndpoints.includes(req.params.clientEndpoint)) {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  } else {
    next();
  }
});

//TODO: Implement various endpoints

//Authenticator
// app.post('/v1/login', authController);

//Search
app.use('/v1/search', searchRouter); // '/v1/search/tags' '/v1/search/user'
// console.log('test');

//User
app.use('/v1/user', userRouter); // All user related jobs - profile updates, reporting

//Auth
app.use('/v1/auth',authRouter);
//Admin
app.use("/v1/admin", adminRouter); // Admin endpoints - unpublish, republish, verify

app.all('*', (req, res, next) => {
  console.log('CANNOT');
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.use(middleware.unknownEndpoint);
// app.use(middleware.errorHandler);

// console.log('check1');
app.use(globalErrorHandler);

// console.log('check');

module.exports = app;
