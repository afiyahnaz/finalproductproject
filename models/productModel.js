const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    brand : {type : String, required:[true, 'brand is required']},
    model : {type : String, required:[true, 'model is required']},
    price :  {type : Number, required:[true, 'price is required']},
    instock: {type: Boolean, default:false},
    category :  {type : String, required:[true, 'category is required']},
    discount:{ type: Number, default:20},
    img:{ type: String},
    createdAt:{type:Date},
    updatedAt:{type:Date, default:Date.now},

});

module.exports = mongoose.model('product',  productSchema);