export class AppError extends Error {
  constructor(message, statusCode) {
    super();

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.message = message

    Error.captureStackTrace(this, this.constructor);
  }
}


export const errorHandler = (err, req, res, next) => {
  console.log(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.code == 'ERR_INVALID_ARG_TYPE') {
    // error = new AppError('Please input valid value!',400)
  }
  
  res.status(err.statusCode).json({
    status: error.status,
    message: error.message
  });
}


const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const message = `Duplicate field value: ${JSON.stringify(err.keyValue)}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};


export const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};