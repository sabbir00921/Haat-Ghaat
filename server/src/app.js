require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { globalErrorHandler } = require("./utils/globalErrorHandler");
const app = express();

// Logging
app.use(morgan("dev"));

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(process.env.BASE_API_URL, require("./router/index.api"));

// global error handler
app.use(globalErrorHandler);

module.exports = app;
