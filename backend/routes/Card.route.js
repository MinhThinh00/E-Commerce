import express from 'express';
import {verifyToken} from "../utils/verifyToken.js"
import { CountCard, addToCard, deleteCard, getProductCard, updateCard } from '../controllers/card.controller.js';

const router= express.Router()

router.post("/add", verifyToken, addToCard)
router.post("/update/:id", verifyToken, updateCard)
router.delete("/delete/:id", verifyToken, deleteCard)
router.get("/count", verifyToken, CountCard)
router.get("/getall", verifyToken, getProductCard)


export default router
