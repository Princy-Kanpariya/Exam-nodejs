const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        Order_id: {
            type: Number,
            trim: true,
        },
        stock: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            trim: true,
        },
        total: {
            type: Number,
        },
        user_id : {
            type : mongoose.Types.ObjectId,
            ref : "user"
        },
        product_id : {
            type : mongoose.Types.ObjectId,
            ref : "product"
        },
        cart_id : {
            type : mongoose.Types.ObjectId,
            ref : "cart"
        },
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Order = mongoose.model("order", orderSchema)

module.exports = Order