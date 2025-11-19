exports.globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    devementerror(err, res);
  } else {
    productionerror(err, res);
  }
};

const devementerror = (err, res) => {
  return res.status(err.statusCode || 500).json({
    message: err.message,
    status: err.status || "error",
    statusCode: err.statusCode || 500,
    data: err.data || null,
    stack: err.stack,
  });
};

const productionerror = (err, res) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    status: err.status || "error",
    statusCode: err.statusCode || 500,
    data: err.data || null,
    stack: err.stack,
  });
};
