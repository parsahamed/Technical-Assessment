/** Central error handler. Sends JSON error and logs in development. */
export function errorHandler(err, req, res, next) {
  const status = err.statusCode ?? err.status ?? 500;
  const message = err.message ?? 'Internal server error';

  if (req.app.get('env') === 'development') {
    console.error(err);
  }

  res.status(status).json({
    error: message,
    ...(req.app.get('env') === 'development' && err.stack && { stack: err.stack }),
  });
}
