/** Logs incoming requests (method, path, status, duration) */
export function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(
      [req.method, req.originalUrl || req.url, res.statusCode, `${ms}ms`].join(' ')
    );
  });
  next();
}
