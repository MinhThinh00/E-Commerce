import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUser } from '../redux/userSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem
} from '@mui/material';
import { toast } from 'react-toastify';

const getAllUser = () => {
  const dispatch = useDispatch();
  const { allUser } = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const userData = Cookies.get('userData');
        const token = userData ? JSON.parse(userData).token : '';

        if (!token) {
          console.error('Token is missing');
          return;
        }

        const res = await axios.get('https://ecommerce-sigmaa-three.vercel.app/api/auth/getall', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        dispatch(setAllUser(res.data));
        setLoading(false);
      } catch (error) {
        console.log("Error fetching other users:", error);
        setLoading(false);
      }
    };
    fetchOtherUsers();
  }, [dispatch]);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setRole(user.role);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleDelete = async (userId) => {
    const userData = Cookies.get('userData');
    const token = userData ? JSON.parse(userData).token : '';

    if (!token) {
      console.error('Token is missing');
      return;
    }

    try {
      await axios.delete(`https://ecommerce-sigmaa-three.vercel.app/api/auth/deleteUser/${userId}`, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Cập nhật danh sách người dùng sau khi xoá
      const updatedAllUser = allUser.filter(user => user._id !== userId);
      dispatch(setAllUser(updatedAllUser));
      
      toast.success("User has been deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };
  const handleChangeRole = async () => {
    const userData = Cookies.get('userData');
    const token = userData ? JSON.parse(userData).token : '';

    if (!token) {
      console.error('Token is missing');
      return;
    }

    try {
      const res = await axios.post(`https://ecommerce-sigmaa-three.vercel.app/api/auth/updateRole/${selectedUser._id}`, 
      { role }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Cập nhật vai trò của người dùng trong danh sách
      const updatedUser = { ...selectedUser, role: res.data.role };
      const updatedAllUser = allUser.map(user => user._id === updatedUser._id ? updatedUser : user);
      dispatch(setAllUser(updatedAllUser));
      
      handleClose();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Ngày Tạo</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUser.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleClickOpen(user)}>Edit</Button>
                  <Button variant="contained" color="secondary" style={{ marginLeft: '8px' }} onClick={()=>{handleDelete(user)}}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Change Role</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography component="div">Name: {selectedUser.username}</Typography>
              <Typography component="div">Email: {selectedUser.email}</Typography>
            </DialogContentText>
            <TextField
              select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="general">General</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleChangeRole} color="primary">Change</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default getAllUser;
