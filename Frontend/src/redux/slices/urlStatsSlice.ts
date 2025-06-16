import { createSlice } from "@reduxjs/toolkit";


const urlStatsSlice = createSlice({
    name: "urlStats",
    initialState: {
        urlStats: null,
        clickedAtData: null,
        deviceData:null,
        referrerData: null,
        countryData: null,
        cityData: null
    },
    reducers: {
        updateUrlStats: (state, action) => {
            state.urlStats = action.payload;
        },
        updateClickedAtDates: (state, action) => {
            state.clickedAtData = action.payload;
        },
        updateReferrerData: (state, action) => {
            state.referrerData = action.payload;
        },
        updateCountryData: (state, action) => {
            state.countryData = action.payload;
        },
        updateCityData: (state, action) => {
            state.cityData = action.payload;
        },
        updateDeviceData: (state, action) => {
            state.deviceData = action.payload;
        },
    },
});

export const { updateUrlStats,updateDeviceData, updateClickedAtDates,updateReferrerData,updateCountryData,updateCityData } = urlStatsSlice.actions;
export default urlStatsSlice.reducer;