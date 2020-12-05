const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Email is not vaild"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 4,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirm is required"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    isVerified: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  //This makes it run only when password has been changed
    if(!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function(input, userPassword) {
    return await bcrypt.compare(input, userPassword);
}

const User = mongoose.model("User", userSchema);
module.exports = User;