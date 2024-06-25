import Product from "../models/product.model.js"

export const uploadProduct= async (req, res)=>{
    try {
        const product= await Product.create(req.body);
        return res.status(200).json({
            message: "Product created successfully",
            success: true,
            data: product,
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error",
        })
    }
}
export const getProducts =  async (req, res)=>{
    try {
        const allProduct = await Product.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: allProduct,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error",
        })
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { ...resBody } = req.body;
        const id= req.params.id;
        if (!id) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false
            });
        }

        const updateProduct = await Product.findByIdAndUpdate(id, resBody, { new: true });

        if (!updateProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        res.json({
            message: "Product updated successfully",
            data: updateProduct,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};
export const getCategoryProduct = async(req,res)=>{
    try{
        // Lấy danh sách các loại sản phẩm khác nhau
        const productCategory = await Product.distinct("category")

        //console.log("category",productCategory)
        const productByCategory = []

        for(const category of productCategory){
            const product = await Product.findOne({category })

            if(product){
                productByCategory.push(product)
            }
        }


        res.json({
            message : "category product",
            data : productByCategory,
            success : true,
            error : false
        })


    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
};
export const getCategoryWiseProduct = async(req,res)=>{
    try{
        const { category } =  req?.query ;
        //console.log('Category:', category); // Log category
        const product = await Product.find({ category })
        //console.log('Products found:', product);
        res.json({
            data : product,
            message : "Product",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
};
export const getProductDetails = async(req,res)=>{
    try{
        const  productId = req.params.id;
        console.log(productId)
        const product = await Product.findById(productId)
        console.log(product)
        res.json({
            data : product,
            message : "Ok",
            success : true,
            error : false
        })

        
    }catch(err){
        res.json({
            message : err?.message  || err,
            error : true,
            success : false
        })
    }
};
export const searchProduct = async (req, res) => {
    try {
        console.log("req.query:", req.query);
        const q = req.query.query;
        console.log("Query parameter:", q);

        // Tìm sản phẩm theo tên
        const products = await Product.find({ productName: { $regex: q, $options: 'i' } });

        // Trả về kết quả
        res.json({
            message: "Ok",
            products,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "loi",
            error: true,
            success: false
        });
    }
};

