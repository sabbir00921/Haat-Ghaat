const express = require("express");
const _ = express.Router();

// Sample route
_.use("/auth", require("./api/user.api"));
module.exports = _;
