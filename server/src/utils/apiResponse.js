class apiResponse {
  constructor(message, statusCode, data) {
    this.message = message;
    this.statusCode = statusCode;
    this.staus = statusCode >= 200 && statusCode < 300 ? "success" : "error";
    this.data = data;
  }
  static success(res, statusCode = 200, message = "Success", data = {}) {
    return res
      .status(statusCode)
      .json(new apiResponse(message, statusCode, data));
  }
}

module.exports = { apiResponse };
