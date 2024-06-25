import jwt from 'jsonwebtoken'
export const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token= req.cookies.access_token ||  authHeader && authHeader.split(' ')[1];
    // console.log(token,1);
    if(!token){
        return res.status(401).json({message: 'No token, authorization denied'})
    }
    try{
        const decoded =await jwt.verify(token, process.env.JWT_SECRET);

        // Lưu thông tin userId từ payload của token vào req.userId
        req.userId = decoded.id;
        next();
    }catch(error){
        console.error('Token verification error:', error);
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
}
