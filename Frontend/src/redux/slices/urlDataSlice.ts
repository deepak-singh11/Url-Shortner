import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UrlDataType {
    username: string,
    email:string,
    profileImage:string,
    joinedAt:string,
};


interface InitialStateType {
    urlData: null | UrlDataType;
};

const initialState:InitialStateType={
    urlData:null,
}

const urlDataSlice = createSlice({
    name: 'urlData',
    initialState,
    reducers: {
        updateUrlData: (state, action:PayloadAction<UrlDataType>) => {
            state.urlData = action.payload;
        },
    }
});

export const { updateUrlData } = urlDataSlice.actions;
export default urlDataSlice.reducer;