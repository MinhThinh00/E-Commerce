import express from 'express';
import { signup,login, logout } from '../controllers/auth.controller.js';
import {verifyToken} from "../utils/verifyToken.js"
import { deleteUser, getAllUser, updateUser } from '../controllers/user.controller.js';
const router= express.Router()

router.post("/signup", signup)
router.post("/login",login)
router.get("/logout",logout)
router.get("/getall", verifyToken,getAllUser)
router.post("/updateRole/:id",verifyToken,updateUser)
router.delete("/deleteUser/:id",verifyToken,deleteUser)
export default router