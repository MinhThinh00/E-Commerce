import express from 'express';
import { getCategoryProduct, getCategoryWiseProduct, getProductDetails, getProducts, searchProduct, updateProduct, uploadProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/upload', uploadProduct);
router.get('/getProduct', getProducts);
router.put('/update/:id', updateProduct);
router.get('/getCategoryProduct', getCategoryProduct);
router.get('/getProductByCategory', getCategoryWiseProduct);
router.get('/getProductSearch', searchProduct);  // Corrected route for search
router.get('/:id', getProductDetails);

export default router;
