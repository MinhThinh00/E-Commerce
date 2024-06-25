import mongoose from 'mongoose';
const CardSchema = new mongoose.Schema({
    productId : {
        ref : 'Product',
        type : String,
   },
   quantity : Number,
   userId : String,
},{
    timestamps:true,
})
const Card = mongoose.model("Card", CardSchema);
export default Card;