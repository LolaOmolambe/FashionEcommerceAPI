const { encodeXText } = require("nodemailer/lib/shared");
const Customer = require("../models/customerModel");
const AppError = require("../utils/appError");
const repo = require("./generalRepo");

exports.createCustomer = repo.createOne(Customer);

exports.getAllCustomers = repo.getAll(Customer);

//Get Customers for a user
exports.getAllCustomersForAUser = async (req, res, next) => {
  try {
    const result = await Customer.find({
      isDeleted: false,
      _userId: req.user._userId,
    });
    res.status(200).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    let customer = await Customer.findOneAndUpdate(
      { _userId: req.user._id, _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!customer) {
      return new AppError("This customer does not exist", 401);
    }
    res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getACustomerById = async (req, res, next) => {
  try {
    let customer = await Customer.find({
      _id: req.params.id,
      _userId: req.user._id,
    });

    if (!customer) {
      return new AppError("This customer does not exist", 401);
    }

    res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    let customer = await Customer.findOneAndUpdate(
      { _userId: req.user._id, _id: req.params.id },
      { isDeleted: true }
    );
    if (!customer) {
      return new AppError("This customer does not exist", 401);
    }
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
