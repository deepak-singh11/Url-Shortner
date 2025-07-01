import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name: "user",
    initialState:{
        userData:null,
        tokenExpiry:null,
        location:null,
        isLoading:true,
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
        },
        updateIsLoading:(state,action)=>{
            state.isLoading=action.payload;
        }
    }
});

export const {updateUserData,updateTokenExpiry,updateLocation,updateIsLoading}=userSlice.actions;
export default userSlice.reducer;