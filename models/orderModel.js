const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    _userId: {
      type: new mongoose.Schema.Types.ObjectId(),
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    //shippingId
    //paymentId
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
