const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema ({
    _productId: {
        type: new mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    _categoryId: {
        type: new mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);
module.exports = ProductCategory;