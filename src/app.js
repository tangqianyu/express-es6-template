import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { json as _json, urlencoded as _urlencoded } from 'body-parser';
import cors from './middleware/cors';
import dotenv from 'dotenv';
import indexRouter from './routes';


import { errorHandler } from './middleware/error';

dotenv.config();

var app = express();

app.use(cors);
app.use(logger('dev'));
app.use(json());
app.use(
  urlencoded({
    extended: false,
  }),
);
app.use(cookieParser());

//#region register route
app.use('/', indexRouter);


//#endregion

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

/* body parser */
app.use(_json());
app.use(
  _urlencoded({
    extended: false,
  }),
);

// error handler
app.use(errorHandler);

export default app;
