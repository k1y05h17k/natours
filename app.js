const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// GLOBAL MIDDLEWARES

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!' 
});

app.use('/api',limiter);


// Body parser, reading data from body into req.body
app.use(express.json({limit:'10kb'}));

// Data sanitization against NOSQL query injection
app.use(mongoSanitize({
  whitelist: [
    'duration',
    'ratingQuantity',
    'rantingAverage',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
}));

// Data sanitization against XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(hpp());




// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.get("/", (req, res) => {
  res.set(
      "Content-Security-Policy",
      "default-src 'self';font-src fonts.gstatic.com;style-src 'self' 'unsafe-inline' fonts.googleapis.com"
  );
  res.status(200).render("base");
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/reviews',reviewRouter);

// Handler all errors of application
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Simple Handler error middleware
app.use(globalErrorHandler);

module.exports = app;
