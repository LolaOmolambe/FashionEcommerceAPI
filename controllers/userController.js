const User = require("../models/userModel");
const AppError = require("../utils/appError");
const repo = require("./generalRepo");

exports.getAllUsers = repo.getAll(User);
exports.getUser = repo.getOne(User);
exports.updateUser = repo.updateOne(User);
exports.deleteUser = repo.deleteOne(User);

