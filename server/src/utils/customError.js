class customError extends Error {
  constructor(statusCode, message, data = null) {
    super(message);
    this.status = statusCode >= 400 && statusCode < 500 ? "Client Error" : "Server Error";
    this.statusCode = statusCode;
    this.isOperational = statusCode >= 400 && statusCode < 500 ? true : false;
    this.data = data;
  }
}
module.exports = { customError };
