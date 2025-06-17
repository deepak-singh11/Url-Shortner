import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface DeviceData{
    name:string;
    count:number;
}

interface ClickedAtData{
    name:string;
    count:number;
}
interface ReferrerData{
    name:string;
    count:number;
}
interface CountryData{
    name:string;
    count:number;
}
interface CityData{
    name:string;
    count:number;
}

interface InitialStateType {
    urlStats: string | null,
    clickedAtData:ClickedAtData[] | null,
    deviceData: DeviceData[] | null,
    referrerData: ReferrerData[] | null,
    countryData:CountryData[] | null,
    cityData: CityData[] | null,
};

const initialState:InitialStateType={
        urlStats: null,
        clickedAtData: null,
        deviceData: null,
        referrerData: null,
        countryData: null,
        cityData: null
};

const urlStatsSlice = createSlice({
    name: "urlStats",
    initialState,
    reducers: {
        updateUrlStats: (state, action:PayloadAction<string>) => {
            state.urlStats = action.payload;
        },
        updateClickedAtDates: (state, action:PayloadAction<ClickedAtData[]>) => {
            state.clickedAtData = action.payload;
        },
        updateReferrerData: (state, action:PayloadAction<ReferrerData[]>) => {
            state.referrerData = action.payload;
        },
        updateCountryData: (state, action:PayloadAction<CountryData[]>) => {
            state.countryData = action.payload;
        },
        updateCityData: (state, action:PayloadAction<CityData[]>) => {
            state.cityData = action.payload;
        },
        updateDeviceData: (state, action:PayloadAction<DeviceData[]>) => {
            state.deviceData = action.payload;
        },
    },
});

export const { updateUrlStats, updateDeviceData, updateClickedAtDates, updateReferrerData, updateCountryData, updateCityData } = urlStatsSlice.actions;
export default urlStatsSlice.reducer;