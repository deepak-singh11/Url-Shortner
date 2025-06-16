import {createSlice} from '@reduxjs/toolkit';

const urlDataSlice=createSlice({
    name:'urlData',
    initialState:{
        urlData:null,
    },
    reducers:{
        updateUrlData:(state,action)=>{
           state.urlData= action.payload;
        },
    }
});

export const {updateUrlData}=urlDataSlice.actions;
export default urlDataSlice.reducer;