// Middleware bắt lỗi toàn cục
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error"
  });
};
