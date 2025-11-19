const jwt = require("jsonwebtoken");
const { customError } = require("../utils/customError");

exports.authGuard = async (req, res, next) => {
  try {
    const accesstoken =
      req.headers?.authorization.replace("Bearer ", "") ||
      req?.body?.accesstToken;

    // const refresstoken = req.headers?.cookie.replace("refreshToken=", "");
    if (!accesstoken) throw new customError(401, "Token not found");

    // veryfy Token
    const decode = await jwt.verify(
      accesstoken,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!decode) throw new customError(401, "Unauthorized access");
    req.user = decode.id;
    next();
  } catch (error) {
    throw new customError(401, error.message);
  }
};
