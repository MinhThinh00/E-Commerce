import mongoose from 'mongoose';
const productSchema= new mongoose.Schema({
    productName : String,
    brandName : String,
    category : String,
    productImage : [],
    description : String,
    price : Number,
    sellingPrice : Number
},{
    timestamps:true,   
})
const Product = mongoose.model("Product", productSchema);
export default Product;