import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name: "user",
    initialState:{
        userData:null,
        tokenExpiry:null,
        location:null,
    },
    reducers:{
        updateUserData:(state,action)=>{
            state.userData=action.payload;
        },
        updateTokenExpiry:(state,action)=>{
            state.tokenExpiry=action.payload;
        },
        updateLocation:(state,action)=>{
            state.location=action.payload;
        }
    }
});

export const {updateUserData,updateTokenExpiry,updateLocation}=userSlice.actions;
export default userSlice.reducer;