const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    _orderId: {
        type: new mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
module.exports = OrderItem;