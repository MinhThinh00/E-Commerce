import User from "../models/user.model.js";
export const getAllUser = async (req, res) => {
    try {
        const loggedInUserId = req.userId; // Lấy userId của người đăng nhập từ req
        //console.log(loggedInUserId);
        // Truy xuất tất cả người dùng trừ người đăng nhập
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateUser = async (req,res,next)=>{
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
export const deleteUser = async (req,res,next)=>{
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  }