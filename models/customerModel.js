const mongoose = require("mongoose");
const validator = require("validator");

var customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      validate: [validator.isMobilePhone, "Phone number is not valid"],
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Email is not vaild"],
    },
    _userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  { timestamps: true }
);

customerSchema.pre(/^find/, function(next) {
    this.find({isDeleted: {$ne: true}})
    this.populate({
        path: '_userId'
    });
    next();
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
