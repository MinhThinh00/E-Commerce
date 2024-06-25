import { createSlice } from "@reduxjs/toolkit";
const userSlice= createSlice({
    name:"user",
    initialState:{
        authUser:null,
        allUser:null
    },
    reducers:{
        setAuthUser:(state, action)=>{
            state.authUser= action.payload;
        },
        setAllUser:(state, action)=>{
            state.allUser= action.payload;
        }
    }
})
export const {setAuthUser, setAllUser}= userSlice.actions;
export default userSlice.reducer;