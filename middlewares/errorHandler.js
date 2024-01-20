import { logEvents } from './logger.js';

const errorHandler = (err, req, res, next) => {
  console.log('Error Handler Middleware Invoked:', err);
  logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; // server error
  res.status(status).json({ message: err.message });
  console.log('Error response sent to client.');
};

export default errorHandler;
