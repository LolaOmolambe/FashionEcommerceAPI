const AppError = require("../utils/appError");

exports.getAll = (Model) => async (req, res, next) => {
  try {
      
    const result = await Model.find();
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

exports.getOne = (Model) => async (req, res, next) => {
  try {
    let result = await Model.findById(req.params.id);

    if (!result) {
      return next(new AppError("No document exists with this ID", 404));
    }
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

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    let result = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return next(new AppError("No document exists with this ID", 404));
    }
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

exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    let result = await Model.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      {
        new: true,
        runValidators: false,
      }
    );

    if (!result) {
      return next(new AppError("No document exists with this ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

exports.createOne = (Model) => async (req, res, next) => {
  try {
      if(req.user){
          req.body._userId = req.user._id;
      }
    let result = await Model.create(req.body);
    console.log(result)
    if (result) {
       res.status(200).json({
        status: "success",
        data: {
          result,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};
