import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {
    const {username,email, password,confirmPassword, profilePic,role } = req.body;
    if(password !== confirmPassword){
        return res.status(400).json({
            message : "password and confirm password not match"
        })
    }
    const mail = await User.findOne({email: email})
    if(mail){
        return res.status(400).json({
            message : "email already exist"
        })
    }
    const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
    const newUser= new User({
        username,
        email,
        password :  hashedPassword,
        profilePic,
        role: role === 'admin' ? 'admin' : 'general' 
    })
    try {
        await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            success: true
         });
    } catch (error) {
        next(error)
    }
};
export const login= async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user= await User.findOne({email});        
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }
        const validPassword= bcrypt.compareSync(password,user.password)   
        if(!validPassword){
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            })
        }
        const token= jwt.sign({id: user._id},process.env.JWT_SECRET)
        const {password:pass, ...userInfor}= user._doc
        res.cookie("access_token",token,{httpOnly:true}).status(200).json({...userInfor,token})

    } catch (error) {
        next(error)
    }
}
export const logout = (req, res) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json({
            success: true,
            message:'User has been logged out!'
        });
      } catch (error) {
        next(error);
      }
};