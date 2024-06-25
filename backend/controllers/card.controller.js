import Card from "../models/Card.model.js";


export const addToCard= async (req, res)=>{
    try{
        const { productId } = req?.body
        const currentUser = req.userId
        
        const isProductAvailable = await Card.findOne({ productId })

        console.log("isProductAvailabl   ",isProductAvailable)

        if(isProductAvailable){
            return res.json({
                message : "Already exits in Add to cart",
                success : false,
                error : true
            })
        }

        const payload  = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newAddToCart = new Card(payload)
        const saveProduct = await newAddToCart.save()


        return res.json({
            data : saveProduct,
            message : "Product Added in Cart",
            success : true,
            error : false
        })
    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
};
export const updateCard = async (req, res) => {
    try{
        const currentUserId = req.userId 
        const addToCartProductId = req?.params.id;
       // console.log(addToCartProductId, "id");
        const qty = req.body.quantity

        const updateProduct = await Card.updateOne({_id : addToCartProductId},{
            ...(qty && {quantity : qty})
        })

        res.json({
            message : "Product Updated",
            data : updateProduct,
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
};
export const deleteCard = async (req, res) => {
    try{
        const currentUserId = req.userId 
        const addToCartProductId = req.params.id;
        const deleteProduct = await Card.findByIdAndDelete({ _id : addToCartProductId,  userId: currentUserId})

        res.json({
            message : "Product Deleted From Cart",
            error : false,
            success : true,
            data : deleteProduct
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
};
export const CountCard = async (req, res)=>{
    try{
        const userId = req.userId
        const count = await Card.countDocuments({
            userId : userId
        })

        res.json({
            data : {
                count : count
            },
            message : "ok",
            error : false,
            success : true
        })
    }catch(error){
        res.json({
            message : error.message || error,
            error : false,
            success : false,
        })
    }
};
export const getProductCard = async (req, res)=>{
    try{
        const currentUser = req.userId
        const allProduct = await Card.find({
            userId : currentUser
        }).populate("productId")

        res.json({
            data : allProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

