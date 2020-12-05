const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRoutes = require("./routes/userRoutes");

const app = express();

//Logger Middleware
if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());

//Routes
app.use("/api/v1/user", userRoutes);

app.all("*", (req,res, next) => {
    next(new AppError(`Route ${req.originalUrl} does not exist`, 404));
});

app.use(globalErrorHandler);

module.exports = app;