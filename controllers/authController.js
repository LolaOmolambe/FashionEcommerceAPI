const crypto = require("crypto");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const Email = require("../utils/mail");

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    //Add to token table
    const token = new Token({
      _userId: newUser._id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    const newToken = await token.save();
    let url = `${req.protocol}://${req.get("host")}/api/v1/user/verifyUser/${
      newUser._id
    }/${newToken.token}`;
    console.log("url ", url);

    //Send the email
    await new Email(newUser, url).sendActivationMail();

    res.status(201).json({
      status: "success",
      message: `A verification email has been sent to ${newUser.email} !`,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user.isVerified) {
      return next(new AppError("Your account has not been verifed", 400));
    }

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }
    const token = signToken(user.id);
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    let { userId, token } = req.params;

    let userToken = await Token.findOne({ token: token });
    if (!userToken) {
      next(new AppError("Your token may have expired", 401));
    }

    //If it exists, check the matching user
    let newUser = await User.findOne({ _id: userToken._userId });
    if (!newUser) {
      next(new AppError("No user exists for this token", 401));
    }
    if (newUser.isVerified) {
      next(new AppError("This user has already been verified", 400));
    }

    //Verify user
    newUser.isVerified = true;
    await newUser.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "This account has been verified. Please log in!",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.resendToken = async (req, res, next) => {
  try {
    let { email } = req.params;

    if (!email) {
      next(new AppError("Email can not be empty", 400));
    }

    let user = await User.findOne({ email });

    if (!user) {
      next(new AppError("User does not exist", 401));
    }
    if (user.isVerified) {
      next(
        new AppError("This account has already been verified, Please log in!")
      );
    }

    //Craete token and save
    const token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    const newToken = await token.save();

    let url = `${req.protocol}://${req.get("host")}/api/v1/user/verifyUser/${
      user._id
    }/${newToken.token}`;
    //console.log("url ", url);

    //Send the email
    await new Email(user, url).sendActivationMail();

    res.status(201).json({
      status: "success",
      message: `A verification email has been sent to ${newUser.email} !`,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.protectRoutes = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      next(new AppError("You are not authenticated", 400));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    //Check if user exists
    const user = await User.findById(decodedToken.id);
    if (!user) {
      next(new AppError("User does not exist", 401));
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("User not authorized", 400));
    }
    next();
  };
};

exports.changePassword = async (req, res, next) => {
  try {
    const user = await user.findById(req.us);
  } catch (err) {
    next(err);
  }
};
