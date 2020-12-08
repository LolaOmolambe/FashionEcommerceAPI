const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const authRoutes = require("./routes/authRoutes");

const app = express();

//Security HTTP headers
app.use(helmet());

//Logger Middleware
if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour"
});

app.use("/api", limiter);


app.use(express.json());

//Data Sanitization against NOSQL query injection
app.use(mongoSanitize());

//Data Sanitization against XSS
app.use(xss());

//Prevent Parameter Pollution
//app.use(hpp());

//Routes
app.use("/api/v1/auth", authRoutes);

app.all("*", (req,res, next) => {
    next(new AppError(`Route ${req.originalUrl} does not exist`, 404));
});

app.use(globalErrorHandler);

module.exports = app;